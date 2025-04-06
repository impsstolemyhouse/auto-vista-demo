
import React from 'react';

interface Vehicle3DViewerProps {
  vehicleId: string;
  make: string;
  model: string;
}

const Vehicle3DViewer = ({ vehicleId, make, model }: Vehicle3DViewerProps) => {
  // Map the vehicle IDs to the respective Sketchfab model URLs
  const modelMap: Record<string, string> = {
    "2": "https://sketchfab.com/models/61f2ce941aeb405aa600f03eafe4e641/embed?ui_infos=0&ui_controls=0&ui_hint=0&ui_watermark=0", // Honda Accord white
    "3": "https://sketchfab.com/models/57cc407d34fc4a7986b779c98c112e3f/embed?ui_infos=0&ui_controls=0&ui_hint=0&ui_watermark=0", // Tesla Model 3 red
    "4": "https://sketchfab.com/models/3d005089037f4b3cbbfed3d6ba188466/embed?ui_infos=0&ui_controls=0&ui_hint=0&ui_watermark=0", // Ford F-150 silver
    "5": "https://sketchfab.com/models/6c84d28e5dc14829b21a25fb7e46a5a9/embed?ui_infos=0&ui_controls=0&ui_hint=0&ui_watermark=0", // Chevrolet Equinox blue
    "6": "https://sketchfab.com/models/6465b6ee36e24233b5b269b99471f8ef/embed?ui_infos=0&ui_controls=0&ui_hint=0&ui_watermark=0", // BMW 3 series blue
  };

  const modelUrl = modelMap[vehicleId];

  if (!modelUrl) {
    return (
      <div className="rounded-lg bg-gray-200 dark:bg-gray-800 aspect-[16/9] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">3D model not available for this vehicle</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-md">
      <div className="aspect-[16/9] w-full">
        <iframe
          title={`${make} ${model} 3D Model`}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          data-mozallowfullscreen="true"
          data-webkitallowfullscreen="true"
          data-xr-spatial-tracking="true"
          data-execution-while-out-of-viewport="true"
          data-execution-while-not-rendered="true"
          data-web-share="true"
          src={modelUrl}
        ></iframe>
      </div>
    </div>
  );
};

export default Vehicle3DViewer;
