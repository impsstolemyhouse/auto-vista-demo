
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface FilterOptions {
  make: string[];
  bodyStyle: string[];
  priceRange: [number, number];
  yearRange: [number, number];
}

interface InventoryFiltersProps {
  onFilterChange: (filters: any) => void;
  availableMakes: string[];
  availableBodyStyles: string[];
  priceRange: [number, number];
  yearRange: [number, number];
}

const InventoryFilters = ({
  onFilterChange,
  availableMakes,
  availableBodyStyles,
  priceRange: maxPriceRange,
  yearRange: maxYearRange,
}: InventoryFiltersProps) => {
  const { translations } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
  const [selectedBodyStyles, setSelectedBodyStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>(maxPriceRange);
  const [yearRange, setYearRange] = useState<[number, number]>(maxYearRange);

  const handleMakeChange = (make: string) => {
    setSelectedMakes((prev) =>
      prev.includes(make)
        ? prev.filter((m) => m !== make)
        : [...prev, make]
    );
  };

  const handleBodyStyleChange = (style: string) => {
    setSelectedBodyStyles((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handleYearChange = (value: number[]) => {
    setYearRange([value[0], value[1]]);
  };

  const applyFilters = () => {
    onFilterChange({
      make: selectedMakes,
      bodyStyle: selectedBodyStyles,
      priceRange,
      yearRange,
    });
    
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const clearFilters = () => {
    setSelectedMakes([]);
    setSelectedBodyStyles([]);
    setPriceRange(maxPriceRange);
    setYearRange(maxYearRange);
    
    onFilterChange({
      make: [],
      bodyStyle: [],
      priceRange: maxPriceRange,
      yearRange: maxYearRange,
    });
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold text-lg">{translations.inventory.filters.title}</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearFilters}
          >
            {translations.inventory.filters.clear}
          </Button>
          <Button 
            variant="default" 
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={16} /> : "Filters"}
          </Button>
        </div>
      </div>

      <div className={`md:block ${isOpen ? 'block' : 'hidden'}`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-medium mb-2">{translations.inventory.filters.make}</h4>
          <div className="space-y-2">
            {availableMakes.map((make) => (
              <div key={make} className="flex items-center space-x-2">
                <Checkbox
                  id={`make-${make}`}
                  checked={selectedMakes.includes(make)}
                  onCheckedChange={() => handleMakeChange(make)}
                />
                <label
                  htmlFor={`make-${make}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {make}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-medium mb-2">{translations.inventory.filters.bodyType}</h4>
          <div className="space-y-2">
            {availableBodyStyles.map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox
                  id={`style-${style}`}
                  checked={selectedBodyStyles.includes(style)}
                  onCheckedChange={() => handleBodyStyleChange(style)}
                />
                <label
                  htmlFor={`style-${style}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {style}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">{translations.inventory.filters.price}</h4>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </span>
          </div>
          <Slider
            defaultValue={[maxPriceRange[0], maxPriceRange[1]]}
            value={[priceRange[0], priceRange[1]]}
            min={maxPriceRange[0]}
            max={maxPriceRange[1]}
            step={1000}
            onValueChange={handlePriceChange}
            className="my-4"
          />
        </div>

        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">{translations.inventory.filters.year}</h4>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {yearRange[0]} - {yearRange[1]}
            </span>
          </div>
          <Slider
            defaultValue={[maxYearRange[0], maxYearRange[1]]}
            value={[yearRange[0], yearRange[1]]}
            min={maxYearRange[0]}
            max={maxYearRange[1]}
            step={1}
            onValueChange={handleYearChange}
            className="my-4"
          />
        </div>

        <div className="p-4">
          <Button 
            variant="default"
            className="w-full bg-dms-blue hover:bg-dms-blue-dark"
            onClick={applyFilters}
          >
            {translations.buttons.filter}
          </Button>
        </div>
      </div>

      {/* Quick filter badges for mobile */}
      <div className="p-4 md:hidden overflow-x-auto whitespace-nowrap">
        <div className="flex gap-2">
          {selectedMakes.map((make) => (
            <Badge 
              key={`selected-make-${make}`}
              variant="secondary"
              className="flex gap-1 items-center"
            >
              {make}
              <X 
                size={14} 
                className="cursor-pointer" 
                onClick={() => handleMakeChange(make)}
              />
            </Badge>
          ))}
          
          {selectedBodyStyles.map((style) => (
            <Badge 
              key={`selected-style-${style}`}
              variant="secondary"
              className="flex gap-1 items-center"
            >
              {style}
              <X 
                size={14} 
                className="cursor-pointer" 
                onClick={() => handleBodyStyleChange(style)}
              />
            </Badge>
          ))}
          
          {(priceRange[0] !== maxPriceRange[0] || priceRange[1] !== maxPriceRange[1]) && (
            <Badge 
              variant="secondary"
              className="flex gap-1 items-center"
            >
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </Badge>
          )}
          
          {(yearRange[0] !== maxYearRange[0] || yearRange[1] !== maxYearRange[1]) && (
            <Badge 
              variant="secondary"
              className="flex gap-1 items-center"
            >
              {yearRange[0]} - {yearRange[1]}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryFilters;
