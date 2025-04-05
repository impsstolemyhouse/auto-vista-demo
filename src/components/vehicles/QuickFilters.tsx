
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

interface QuickFiltersProps {
  onFilterSelect: (filter: {type: string, value: string}) => void;
}

const QuickFilters = ({ onFilterSelect }: QuickFiltersProps) => {
  const { translations } = useLanguage();

  const quickFilters = [
    { type: 'bodyStyle', value: 'SUV', label: translations.inventory.quickFilters.suv },
    { type: 'bodyStyle', value: 'Sedan', label: translations.inventory.quickFilters.sedan },
    { type: 'bodyStyle', value: 'Truck', label: translations.inventory.quickFilters.truck },
    { type: 'price', value: 'under10k', label: translations.inventory.quickFilters.under10k },
    { type: 'price', value: 'under20k', label: translations.inventory.quickFilters.under20k },
    { type: 'feature', value: 'luxury', label: translations.inventory.quickFilters.luxury }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {quickFilters.map((filter, index) => (
        <Button
          key={index}
          variant="outline"
          className="rounded-full px-4 py-1 h-auto border-gray-300 hover:border-dms-blue hover:text-dms-blue"
          onClick={() => onFilterSelect(filter)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default QuickFilters;
