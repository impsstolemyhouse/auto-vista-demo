import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import VehicleGallery from '@/components/vehicles/VehicleGallery';
import VehicleSpecs from '@/components/vehicles/VehicleSpecs';
import VehicleFinanceCalculator from '@/components/vehicles/VehicleFinanceCalculator';
import VehicleCard from '@/components/vehicles/VehicleCard';
import Vehicle3DViewer from '@/components/vehicles/Vehicle3DViewer';
import { Vehicle } from '@/data/vehicles';
import vehicles from '@/data/vehicles';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency, getRandomItems } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, MailOpen, View3d } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { translations } = useLanguage();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [similarVehicles, setSimilarVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      const foundVehicle = vehicles.find(v => v.id === id);
      setVehicle(foundVehicle || null);
      
      if (foundVehicle) {
        // Find similar vehicles (same make or body style)
        // For demo purposes, only show vehicles that have 3D models
        const validModelIds = ["2", "3", "4", "5", "6"];
        const similar = vehicles.filter(v => 
          v.id !== id && 
          (v.make === foundVehicle.make || v.bodyStyle === foundVehicle.bodyStyle) && 
          validModelIds.includes(v.id)
        );
        
        // If no similar vehicles found that have 3D models, use some that do have models
        if (similar.length === 0) {
          const modelVehicles = vehicles.filter(v => validModelIds.includes(v.id) && v.id !== id);
          setSimilarVehicles(getRandomItems(modelVehicles, Math.min(3, modelVehicles.length)));
        } else {
          setSimilarVehicles(getRandomItems(similar, Math.min(3, similar.length)));
        }
      }
      
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="dms-container py-12">
          <div className="flex justify-center items-center h-64">
            <div className="h-10 w-10 border-4 border-dms-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!vehicle) {
    return (
      <Layout>
        <div className="dms-container py-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Vehicle Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The vehicle you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/inventory">
              <Button>View All Vehicles</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 py-10">
        <div className="dms-container">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-4">
            <Link to="/" className="text-gray-500 hover:text-dms-blue">
              {translations.nav.home}
            </Link>
            <span className="mx-2">/</span>
            <Link to="/inventory" className="text-gray-500 hover:text-dms-blue">
              {translations.nav.inventory}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 dark:text-gray-300">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </span>
          </div>

          {/* Vehicle Title */}
          <div className="flex flex-wrap justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{vehicle.bodyStyle}</Badge>
                <Badge variant="outline">{vehicle.transmission}</Badge>
                <Badge variant="outline">{vehicle.engine}</Badge>
                <Badge variant="outline">{formatCurrency(vehicle.price)}</Badge>
              </div>
            </div>
            <div className="text-right mt-4 md:mt-0">
              <p className="text-3xl font-bold text-dms-blue mb-1">
                {formatCurrency(vehicle.price)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {vehicle.mileage.toLocaleString()} miles
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Vehicle Media Tabs */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="gallery" className="mb-6">
                <TabsList className="grid w-full grid-cols-2 mb-2">
                  <TabsTrigger value="gallery">Photo Gallery</TabsTrigger>
                  <TabsTrigger value="3d">3D Model</TabsTrigger>
                </TabsList>
                <TabsContent value="gallery">
                  <VehicleGallery images={vehicle.images} make={vehicle.make} model={vehicle.model} />
                </TabsContent>
                <TabsContent value="3d">
                  <Vehicle3DViewer vehicleId={vehicle.id} make={vehicle.make} model={vehicle.model} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-lg">{translations.vehicle.cta.title}</h3>
                </div>
                <div className="p-4 space-y-4">
                  <Button className="w-full bg-dms-blue hover:bg-dms-blue-dark">
                    <Calendar className="mr-2 h-4 w-4" />
                    {translations.vehicle.cta.testDrive}
                  </Button>
                  <Button className="w-full" variant="outline">
                    <MailOpen className="mr-2 h-4 w-4" />
                    {translations.vehicle.cta.contact}
                  </Button>
                  <Button className="w-full" variant="outline">
                    <DollarSign className="mr-2 h-4 w-4" />
                    {translations.vehicle.cta.applyFinance}
                  </Button>
                </div>
              </div>

              <VehicleFinanceCalculator vehiclePrice={vehicle.price} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2">
              {/* Vehicle Description */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-lg">{translations.vehicle.overview}</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {vehicle.description}
                  </p>
                </div>
              </div>

              {/* Vehicle Features */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-lg">{translations.vehicle.features}</h3>
                </div>
                <div className="p-4">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    {vehicle.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <VehicleSpecs vehicle={vehicle} />
            </div>
          </div>

          {/* Similar Vehicles */}
          {similarVehicles.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">{translations.vehicle.similar}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default VehicleDetail;
