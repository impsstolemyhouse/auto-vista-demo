
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/home/HeroBanner';
import QuickSearch from '@/components/home/QuickSearch';
import FeatureHighlights from '@/components/home/FeatureHighlights';
import FeaturedVehicles from '@/components/home/FeaturedVehicles';

const Index = () => {
  return (
    <Layout>
      <HeroBanner />
      
      <div className="dms-container py-10">
        <div className="-mt-16 relative z-20">
          <QuickSearch />
        </div>
      </div>
      
      <FeatureHighlights />
      <FeaturedVehicles />
      
      {/* API sync simulation */}
      <div className="py-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="dms-container">
          <div className="flex items-center justify-center gap-3">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Inventory synced via DealersLink API
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
