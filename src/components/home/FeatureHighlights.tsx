
import { useLanguage } from '@/context/LanguageContext';
import { CreditCard, Repeat, Globe, HeadphonesIcon } from 'lucide-react';

const FeatureHighlights = () => {
  const { translations } = useLanguage();

  const features = [
    {
      icon: <CreditCard className="h-10 w-10 text-dms-blue" />,
      title: translations.home.features.approved,
      description: translations.home.features.approvedDesc
    },
    {
      icon: <Repeat className="h-10 w-10 text-dms-blue" />,
      title: translations.home.features.trade,
      description: translations.home.features.tradeDesc
    },
    {
      icon: <Globe className="h-10 w-10 text-dms-blue" />,
      title: translations.home.features.languages,
      description: translations.home.features.languagesDesc
    },
    {
      icon: <HeadphonesIcon className="h-10 w-10 text-dms-blue" />,
      title: translations.home.features.support,
      description: translations.home.features.supportDesc
    }
  ];

  return (
    <div className="py-10 md:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="dms-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transform transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlights;
