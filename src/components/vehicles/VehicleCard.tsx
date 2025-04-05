
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Vehicle } from '@/data/vehicles';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const { translations } = useLanguage();
  
  return (
    <div className="dms-card group">
      <div className="relative overflow-hidden aspect-[16/9]">
        <img 
          src={vehicle.images[0]} 
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute top-2 left-2 flex gap-2">
          {vehicle.isNew && (
            <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
          )}
          {vehicle.isFeatured && (
            <Badge className="bg-dms-blue hover:bg-dms-blue-dark">Featured</Badge>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="font-bold text-lg text-dms-blue">
            {formatCurrency(vehicle.price)}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-y-2 mb-3 text-sm text-gray-600 dark:text-gray-300">
          <div className="w-1/2 flex items-center gap-1">
            <span className="font-medium">Mileage:</span> {vehicle.mileage.toLocaleString()}
          </div>
          <div className="w-1/2 flex items-center gap-1">
            <span className="font-medium">Color:</span> {vehicle.exteriorColor}
          </div>
          <div className="w-1/2 flex items-center gap-1">
            <span className="font-medium">Engine:</span> {vehicle.engine}
          </div>
          <div className="w-1/2 flex items-center gap-1">
            <span className="font-medium">Type:</span> {vehicle.bodyStyle}
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
          <Link to={`/vehicle/${vehicle.id}`} className="dms-button-primary w-full text-center">
            {translations.buttons.viewDetails}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
