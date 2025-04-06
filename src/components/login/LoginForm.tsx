
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import ReCAPTCHA from "react-google-recaptcha";

const LoginForm = () => {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, remember: checked }));
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaVerified(!!value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaVerified) {
      toast({
        title: "Verification required",
        description: "Please complete the CAPTCHA verification",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      toast({
        title: "Login successful",
        description: "Redirecting to dashboard...",
      });
      setIsLoading(false);
    }, 1500);
  };

  // Load reCAPTCHA script
  useEffect(() => {
    const loadScriptByURL = (id: string, url: string, callback: () => void) => {
      const isScriptExist = document.getElementById(id);
      
      if (!isScriptExist) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }
      
      if (isScriptExist && callback) callback();
    };
    
    // Load the reCAPTCHA script
    loadScriptByURL("recaptcha-key", "https://www.google.com/recaptcha/api.js", function () {
      console.log("reCAPTCHA script loaded");
    });
    
    return () => {
      // Cleanup - remove script
      const scriptElement = document.getElementById("recaptcha-key");
      if (scriptElement) document.body.removeChild(scriptElement);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            {translations.login.email}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            {translations.login.password}
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={formData.remember}
              onCheckedChange={handleCheckboxChange}
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {translations.login.remember}
            </label>
          </div>

          <a
            href="#"
            className="text-sm text-dms-blue hover:underline"
          >
            {translations.login.forgot}
          </a>
        </div>
        
        <div className="flex justify-center my-4">
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test key, replace with your own in production
            onChange={handleCaptchaChange}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-dms-blue hover:bg-dms-blue-dark"
        disabled={isLoading || !captchaVerified}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          translations.login.login
        )}
      </Button>

      <div className="relative flex items-center justify-center mt-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative px-4 text-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
          {translations.login.or}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" type="button">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
              fill="#4285F4"
            />
            <path
              d="M12.956 16.455c-1.2 0-2.199-.34-2.971-.984l-3.055 2.356c1.752 1.37 3.944 2.173 6.026 2.173 3.627 0 6.718-1.997 8.208-4.789l-3.054-2.356c-.878 1.316-2.458 2.146-4.154 2.146z"
              fill="#34A853"
            />
            <path
              d="M5.984 14.794l-2.995 2.234C4.445 19.863 7.986 22 12.956 22c3.796 0 7.002-1.42 9.248-3.798l-3.054-2.355c-1.02 1.376-2.589 2.233-4.25 2.233-2.663 0-4.897-1.593-5.916-3.913z"
              fill="#FBBC05"
            />
            <path
              d="M12.956 5.225c1.496 0 2.841.527 3.89 1.563l2.718-2.717C17.441 2.091 15.211 1 12.956 1 7.986 1 4.445 3.137 2.989 6.976l2.995 2.234c1.019-2.32 3.253-3.985 5.916-3.985z"
              fill="#EB4335"
            />
          </svg>
          Google
        </Button>
        <Button variant="outline" type="button">
          <svg className="w-5 h-5 mr-2 text-[#1877F2]" viewBox="0 0 24 24">
            <path
              d="M24 12.073c0-5.999-4.478-10.941-10.285-11.689v7.883h2.857l.551 3.807h-3.409v2.472c0 1.044.492 2.061 2.068 2.061h1.601v3.241s-1.453.249-2.843.249c-2.901 0-4.798-1.76-4.798-4.946v-3.077h-3.228v-3.807h3.228v-7.883C4.477 1.132 0 6.074 0 12.073c0 6.628 5.373 12 12 12s12-5.372 12-12z"
              fill="currentColor"
            />
          </svg>
          Facebook
        </Button>
      </div>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        {translations.login.noAccount}{' '}
        <a href="#" className="text-dms-blue hover:underline">
          {translations.login.register}
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
