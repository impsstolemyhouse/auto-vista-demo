import Layout from "@/components/layout/Layout";
import ContactForm from "@/components/contact/ContactForm";
import GoogleMap from "@/components/contact/GoogleMap";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

const Contact = () => {
  const { translations } = useLanguage();

  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 py-10">
        <div className="dms-container">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3">
              {translations.contact.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              {translations.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <ContactForm />
            </div>

            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  {translations.contact.info.title}
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-dms-blue mt-1 mr-3" />
                    <p className="text-gray-700 dark:text-gray-300">
                      {translations.contact.info.address}
                    </p>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-dms-blue mt-1 mr-3" />
                    <p className="text-gray-700 dark:text-gray-300">
                      {translations.contact.info.phone}
                    </p>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-dms-blue mt-1 mr-3" />
                    <p className="text-gray-700 dark:text-gray-300">
                      {translations.contact.info.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {translations.contact.info.hours}
                </h2>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-dms-blue mt-1 mr-3" />
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">
                        {translations.contact.info.weekdays}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">
                        {translations.contact.info.saturday}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">
                        {translations.contact.info.sunday}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg overflow-hidden shadow-md">
                <iframe
                  title="Dealership Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.351752942772!2d-118.3525740847825!3d33.96168092920382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b7343a5276eb%3A0x37e9f8c74a1d13b1!2sInglewood%2C%20CA!5e0!3m2!1sen!2sus!4v1712416428931!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
