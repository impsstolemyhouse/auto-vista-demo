
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Moon, Sun, ChevronDown, Menu, X } from 'lucide-react';

type LanguageOption = {
  code: 'en' | 'es' | 'ru' | 'ua';
  label: string;
};

const Header = () => {
  const { language, setLanguage, translations } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languageOptions: LanguageOption[] = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'ru', label: 'Русский' },
    { code: 'ua', label: 'Українська' }
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="dms-container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-dms-blue dark:text-white">AutoVista</span>
              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">DMS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-dms-blue dark:hover:text-dms-blue transition-colors">
              {translations.nav.home}
            </Link>
            <Link to="/inventory" className="text-sm font-medium hover:text-dms-blue dark:hover:text-dms-blue transition-colors">
              {translations.nav.inventory}
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-dms-blue dark:hover:text-dms-blue transition-colors">
              {translations.nav.contact}
            </Link>
            <Link to="/login" className="text-sm font-medium hover:text-dms-blue dark:hover:text-dms-blue transition-colors">
              {translations.nav.login}
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <span className="text-sm">{language.toUpperCase()}</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                {languageOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option.code}
                    onClick={() => setLanguage(option.code)}
                    className={`text-sm cursor-pointer ${language === option.code ? 'font-semibold text-dms-blue' : ''}`}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            <Button 
              variant="default" 
              size="sm" 
              className="hidden md:flex bg-dms-blue hover:bg-dms-blue-dark"
            >
              {translations.buttons.getCta}
            </Button>

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 shadow-lg">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              {translations.nav.home}
            </Link>
            <Link 
              to="/inventory" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              {translations.nav.inventory}
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              {translations.nav.contact}
            </Link>
            <Link 
              to="/login" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              {translations.nav.login}
            </Link>
            <div className="mt-4 px-3">
              <Button 
                variant="default" 
                size="sm" 
                className="w-full bg-dms-blue hover:bg-dms-blue-dark"
                onClick={() => setMobileMenuOpen(false)}
              >
                {translations.buttons.getCta}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
