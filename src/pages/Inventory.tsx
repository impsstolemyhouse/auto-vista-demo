
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import VehicleCard from '@/components/vehicles/VehicleCard';
import InventoryFilters from '@/components/vehicles/InventoryFilters';
import QuickFilters from '@/components/vehicles/QuickFilters';
import { Vehicle } from '@/data/vehicles';
import vehicles from '@/data/vehicles';
import { useLanguage } from '@/context/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Inventory = () => {
  const { translations } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles);
  const [filters, setFilters] = useState({
    make: searchParams.get('make') ? [searchParams.get('make') as string] : [],
    model: searchParams.get('model') ? [searchParams.get('model') as string] : [],
    bodyStyle: [],
    priceRange: [0, 100000],
    yearRange: [2015, 2023],
  });
  const [sortBy, setSortBy] = useState('newest');

  // Get unique values for filter options
  const availableMakes = Array.from(new Set(vehicles.map(v => v.make))).sort();
  const availableBodyStyles = Array.from(new Set(vehicles.map(v => v.bodyStyle))).sort();
  const minPrice = 0;
  const maxPrice = Math.max(...vehicles.map(v => v.price));
  const minYear = Math.min(...vehicles.map(v => v.year));
  const maxYear = Math.max(...vehicles.map(v => v.year));

  // Filter vehicles based on current filters
  useEffect(() => {
    let result = [...vehicles];

    // Apply make filter
    if (filters.make.length > 0) {
      result = result.filter(v => filters.make.includes(v.make));
    }

    // Apply model filter
    if (filters.model.length > 0) {
      result = result.filter(v => filters.model.includes(v.model));
    }

    // Apply body style filter
    if (filters.bodyStyle.length > 0) {
      result = result.filter(v => filters.bodyStyle.includes(v.bodyStyle));
    }

    // Apply price range filter
    result = result.filter(
      v => v.price >= filters.priceRange[0] && v.price <= filters.priceRange[1]
    );

    // Apply year range filter
    result = result.filter(
      v => v.year >= filters.yearRange[0] && v.year <= filters.yearRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'oldest':
        result.sort((a, b) => a.year - b.year);
        break;
      case 'priceLow':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'mileageLow':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'mileageHigh':
        result.sort((a, b) => b.mileage - a.mileage);
        break;
      default:
        result.sort((a, b) => b.year - a.year);
    }

    setFilteredVehicles(result);
  }, [filters, sortBy]);

  // Handle URL params
  useEffect(() => {
    const makeParam = searchParams.get('make');
    const modelParam = searchParams.get('model');
    const yearParam = searchParams.get('year');
    const priceParam = searchParams.get('price');

    let newFilters = { ...filters };
    
    if (makeParam) {
      newFilters.make = [makeParam];
    }
    
    if (modelParam) {
      newFilters.model = [modelParam];
    }
    
    if (yearParam) {
      const year = parseInt(yearParam);
      newFilters.yearRange = [year, year];
    }
    
    if (priceParam) {
      const price = parseInt(priceParam);
      newFilters.priceRange = [0, price];
    }
    
    setFilters(newFilters);
  }, [searchParams]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleQuickFilterSelect = (filter: {type: string, value: string}) => {
    let newFilters = { ...filters };
    
    switch (filter.type) {
      case 'bodyStyle':
        newFilters.bodyStyle = [filter.value];
        break;
      case 'price':
        if (filter.value === 'under10k') {
          newFilters.priceRange = [0, 10000];
        } else if (filter.value === 'under20k') {
          newFilters.priceRange = [0, 20000];
        }
        break;
      case 'feature':
        // For demo, let's say luxury vehicles are those priced over 40000
        if (filter.value === 'luxury') {
          newFilters.priceRange = [40000, 100000];
        }
        break;
    }
    
    setFilters(newFilters);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="dms-container">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{translations.inventory.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{translations.inventory.subtitle}</p>
          </div>

          <QuickFilters onFilterSelect={handleQuickFilterSelect} />

          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {translations.inventory.results.showing} <span className="font-semibold">{filteredVehicles.length}</span> {translations.inventory.results.of} <span className="font-semibold">{vehicles.length}</span> {translations.inventory.results.vehicles}
            </p>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{translations.inventory.sort.newest}</span>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={translations.buttons.sort} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{translations.inventory.sort.newest}</SelectItem>
                  <SelectItem value="oldest">{translations.inventory.sort.oldest}</SelectItem>
                  <SelectItem value="priceLow">{translations.inventory.sort.priceLow}</SelectItem>
                  <SelectItem value="priceHigh">{translations.inventory.sort.priceHigh}</SelectItem>
                  <SelectItem value="mileageLow">{translations.inventory.sort.mileageLow}</SelectItem>
                  <SelectItem value="mileageHigh">{translations.inventory.sort.mileageHigh}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <InventoryFilters
                onFilterChange={handleFilterChange}
                availableMakes={availableMakes}
                availableBodyStyles={availableBodyStyles}
                priceRange={[minPrice, maxPrice]}
                yearRange={[minYear, maxYear]}
              />
            </div>
            
            <div className="lg:col-span-3">
              {filteredVehicles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {translations.inventory.noResults}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Inventory;
