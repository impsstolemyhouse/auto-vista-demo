
import { useEffect, useRef } from 'react';

const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize the map only after the script has loaded
    const initMap = () => {
      if (!mapRef.current || !window.google) return;
      
      // Default to San Francisco for the demo
      const location = { lat: 37.7749, lng: -122.4194 };
      
      const map = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: 14,
        mapId: '8e0a97af9386fef',
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      });
      
      // Add a marker for the dealership
      new window.google.maps.Marker({
        position: location,
        map,
        title: 'Auto Dealership',
        animation: window.google.maps.Animation.DROP
      });
    };

    // If Google Maps script is already loaded
    if (window.google && window.google.maps) {
      initMap();
    } else {
      // Load Google Maps API script if not already loaded
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap&libraries=places&v=weekly`;
      script.async = true;
      script.defer = true;
      
      // Define the callback globally
      window.initMap = initMap;
      
      document.head.appendChild(script);
      
      return () => {
        // Cleanup
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
        delete window.initMap;
      };
    }
  }, []);
  
  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
};

// Add initMap to window type
declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

export default GoogleMap;
