
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const QuickSearch = () => {
  const { translations } = useLanguage();
  const navigate = useNavigate();
  
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');

  const makes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Tesla', 'BMW', 'Audi', 'Mazda', 'Jeep', 'Hyundai', 'Volkswagen', 'Subaru'];
  const models = ['Corolla', 'Camry', 'RAV4', 'Accord', 'Civic', 'CR-V', 'F-150', 'Mustang', 'Silverado', 'Equinox', 'Model 3', 'Model Y', '3 Series', 'X5', 'Q5', 'CX-5', 'Grand Cherokee', 'Tucson', 'Tiguan', 'Outback'];
  const years = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'];
  const prices = ['10000', '20000', '30000', '40000', '50000', '60000', '70000', '80000', '90000', '100000'];

  const handleSearch = () => {
    let searchParams = new URLSearchParams();
    
    if (make) searchParams.append('make', make);
    if (model) searchParams.append('model', model);
    if (year) searchParams.append('year', year);
    if (price) searchParams.append('price', price);
    
    navigate(`/inventory?${searchParams.toString()}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-lg">{translations.home.search.title}</h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {translations.home.search.make}
            </label>
            <Select value={make} onValueChange={setMake}>
              <SelectTrigger>
                <SelectValue placeholder={translations.home.search.anyMake} />
              </SelectTrigger>
              <SelectContent>
                {makes.map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              {translations.home.search.model}
            </label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
                <SelectValue placeholder={translations.home.search.anyModel} />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              {translations.home.search.year}
            </label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger>
                <SelectValue placeholder={translations.home.search.anyYear} />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              {translations.home.search.price}
            </label>
            <Select value={price} onValueChange={setPrice}>
              <SelectTrigger>
                <SelectValue placeholder={translations.home.search.anyPrice} />
              </SelectTrigger>
              <SelectContent>
                {prices.map((price) => (
                  <SelectItem key={price} value={price}>
                    {`< $${parseInt(price).toLocaleString()}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          className="w-full mt-4 bg-dms-blue hover:bg-dms-blue-dark"
          onClick={handleSearch}
        >
          <Search className="mr-2 h-4 w-4" />
          {translations.buttons.search}
        </Button>
      </div>
    </div>
  );
};

export default QuickSearch;
