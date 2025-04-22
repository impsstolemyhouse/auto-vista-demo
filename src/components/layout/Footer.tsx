import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const { translations } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-6">
      <div className="dms-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-dms-blue dark:text-white">
                MCAD
              </span>
              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                LLC
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {translations.footer.tagline}
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-gray-500 hover:text-dms-blue dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-dms-blue dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-dms-blue dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              {translations.footer.quickLinks}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-dms-blue dark:hover:text-white transition-colors"
                >
                  {translations.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  to="/inventory"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-dms-blue dark:hover:text-white transition-colors"
                >
                  {translations.nav.inventory}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-dms-blue dark:hover:text-white transition-colors"
                >
                  {translations.nav.contact}
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-dms-blue dark:hover:text-white transition-colors"
                >
                  {translations.nav.login}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              {translations.footer.services}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-dms-blue dark:hover:text-white transition-colors"
                >
                  {translations.footer.financing}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-dms-blue dark:hover:text-white transition-colors"
                >
                  {translations.footer.insurance}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-dms-blue dark:hover:text-white transition-colors"
                >
                  {translations.footer.tradeIn}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-dms-blue dark:hover:text-white transition-colors"
                >
                  {translations.footer.maintenance}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              {translations.footer.contactUs}
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <Phone size={16} className="mt-1 mr-2 text-dms-blue" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-start">
                <Mail size={16} className="mt-1 mr-2 text-dms-blue" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  info@example.com
                </span>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mt-1 mr-2 text-dms-blue" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  123 Dealership Ave, San Francisco, CA 94103
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            &copy; {currentYear} MCAD LLC. {translations.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
