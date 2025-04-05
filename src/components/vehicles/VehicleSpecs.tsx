
import { Vehicle } from '@/data/vehicles';
import { useLanguage } from '@/context/LanguageContext';

interface VehicleSpecsProps {
  vehicle: Vehicle;
}

const VehicleSpecs = ({ vehicle }: VehicleSpecsProps) => {
  const { translations } = useLanguage();

  const specs = [
    { label: 'Make', value: vehicle.make },
    { label: 'Model', value: vehicle.model },
    { label: 'Year', value: vehicle.year },
    { label: 'Mileage', value: `${vehicle.mileage.toLocaleString()} miles` },
    { label: 'Body Style', value: vehicle.bodyStyle },
    { label: 'Exterior Color', value: vehicle.exteriorColor },
    { label: 'Interior Color', value: vehicle.interiorColor },
    { label: 'Transmission', value: vehicle.transmission },
    { label: 'Engine', value: vehicle.engine },
    { label: 'Fuel Type', value: vehicle.fuelType },
    { label: 'VIN', value: vehicle.vin },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-lg">{translations.vehicle.specs}</h3>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-start">
              <span className="font-medium text-gray-700 dark:text-gray-300 w-1/3">
                {spec.label}:
              </span>
              <span className="text-gray-900 dark:text-white w-2/3">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecs;
