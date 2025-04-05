
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import vehicles from '@/data/vehicles';
import VehicleCard from '@/components/vehicles/VehicleCard';
import { Button } from '@/components/ui/button';

const FeaturedVehicles = () => {
  const { translations } = useLanguage();
  
  // Get featured vehicles
  const featuredVehicles = vehicles.filter(vehicle => vehicle.isFeatured).slice(0, 4);

  return (
    <div className="py-10 md:py-16">
      <div className="dms-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">
            {translations.home.featured.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {translations.home.featured.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <Link to="/inventory">
            <Button size="lg" className="bg-dms-blue hover:bg-dms-blue-dark">
              {translations.home.featured.viewAll}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedVehicles;
