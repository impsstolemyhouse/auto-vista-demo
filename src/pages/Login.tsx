
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/login/LoginForm';
import { useLanguage } from '@/context/LanguageContext';

const Login = () => {
  const { translations } = useLanguage();

  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 py-10 min-h-[80vh] flex items-center">
        <div className="dms-container max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">{translations.login.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {translations.login.subtitle}
              </p>
            </div>
            
            <LoginForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
