import { useEffect, useRef } from "react";

interface ReCaptchaProps {
  siteKey: string;
  onVerify: (verified: boolean) => void;
  className?: string;
}

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const ReCaptchaComponent = ({
  siteKey,
  onVerify,
  className,
}: ReCaptchaProps) => {
  const recaptchaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha) {
        renderRecaptcha();
      } else {
        const script = document.createElement("script");
        script.src =
          "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoadCallback&render=explicit";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        (window as any).onRecaptchaLoadCallback = renderRecaptcha;
      }
    };

    loadRecaptcha();

    return () => {
      const script = document.querySelector('script[src*="recaptcha"]');
      if (script) script.remove();
    };
  }, [siteKey]);

  const renderRecaptcha = () => {
    if (recaptchaRef.current && window.grecaptcha) {
      window.grecaptcha.render(recaptchaRef.current, {
        sitekey: siteKey,
        callback: () => onVerify(true),
      });
    }
  };

  return (
    // <div
    //   className={`bg-gray-50 p-4 rounded-md border border-gray-200 ${className}`}
    // >
    <div ref={recaptchaRef} className="flex justify-center"></div>
    // </div>
  );
};

export default ReCaptchaComponent;
