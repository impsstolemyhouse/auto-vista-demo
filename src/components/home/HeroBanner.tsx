
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const HeroBanner = () => {
  const { translations } = useLanguage();

  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Luxury car"
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      
      <div className="dms-container relative z-10 py-20 md:py-28">
        <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            {translations.home.hero.title}
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-gray-200 animate-fade-in">
            {translations.home.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in">
            <Link to="/inventory">
              <Button size="lg" className="w-full sm:w-auto bg-dms-blue hover:bg-dms-blue-dark">
                <Search className="mr-2 h-4 w-4" />
                {translations.buttons.search}
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                {translations.nav.contact}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
