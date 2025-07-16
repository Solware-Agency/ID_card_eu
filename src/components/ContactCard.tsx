import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, MessageCircle, Linkedin, Globe, Calendar, Globe2 } from 'lucide-react';
import { getEmployeeBySlug } from '../data/empleados';
import { STRINGS } from '../i18n/strings';
import { trackEvent } from '../utils/analytics';
import type { Language } from '../types';

const ContactCard: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [language, setLanguage] = useState<Language['code']>('es');
  const employee = slug ? getEmployeeBySlug(slug) : null;
  const strings = STRINGS[language];

  useEffect(() => {
    if (employee) {
      trackEvent('page_view', employee.name);
      document.title = `${employee.name} - SolwareID`;
    }
  }, [employee]);

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{strings.notFound}</h1>
          <p className="text-gray-600">{strings.notFoundDesc}</p>
        </div>
      </div>
    );
  }

  const handleAction = (action: string) => {
    trackEvent(action, employee.name);
  };

  const formatPhoneForCall = (phone: string) => phone.replace(/\s+/g, '');

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <div 
          className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-t-3xl h-48 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0C1E5B 0%, #1e40af 100%)' }}
        >
          <div className="absolute bottom-0 right-0 opacity-10">
            <div className="text-6xl font-bold text-white transform rotate-12"></div>
          </div>
          
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="flex items-center gap-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm font-medium hover:bg-opacity-30 transition-all"
            >
              <Globe2 size={14} />
              {language.toUpperCase()}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-b-3xl shadow-xl p-6 -mt-16 relative z-10">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
              <img
                src={employee.photo}
                alt={employee.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=0C1E5B&color=fff&size=96`;
                }}
              />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-1">{employee.name}</h1>
            <p className="text-gray-600 mb-1">{employee.title[language]}</p>
            <p className="text-blue-700 font-medium text-sm italic">{employee.company[language]}</p>
          </div>

          <div className="space-y-3 mb-6">
            <a
              href={`mailto:${employee.email}`}
              onClick={() => handleAction('click_email')}
              className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Mail size={18} className="text-white" />
              </div>
              <span className="text-gray-800 font-medium">{employee.email}</span>
            </a>

            <a
              href={`tel:${formatPhoneForCall(employee.phone)}`}
              onClick={() => handleAction('click_call')}
              className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Phone size={18} className="text-white" />
              </div>
              <span className="text-gray-800 font-medium">{employee.phone}</span>
            </a>

            <a
              href={`https://wa.me/${employee.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleAction('click_whatsapp')}
              className="flex items-center gap-3 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
            >
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle size={18} className="text-white" />
              </div>
              <span className="text-gray-800 font-medium">WhatsApp</span>
            </a>

            {employee.linkedin && (
              <a
                href={`https://linkedin.com/in/${employee.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleAction('click_social')}
                className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                  <Linkedin size={18} className="text-white" />
                </div>
                <span className="text-gray-800 font-medium">{employee.linkedin}</span>
              </a>
            )}

            {employee.website && (
              <a
                href={`https://${employee.website}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleAction('click_social')}
                className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Globe size={18} className="text-white" />
                </div>
                <span className="text-gray-800 font-medium">{employee.website}</span>
              </a>
            )}
          </div>

          <div className="space-y-3">
            <a
              href={`/vcf/${employee.slug}.vcf`}
              download
              onClick={() => handleAction('click_save_contact')}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-center transition-colors"
              style={{ backgroundColor: '#0C1E5B' }}
            >
              {strings.save}
            </a>

            {employee.calendly && (
              <a
                href={employee.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleAction('click_agendar')}
                className="flex items-center justify-center gap-2 w-full bg-white border-2 border-blue-600 text-blue-600 font-bold py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors"
              >
                <Calendar size={18} />
                {strings.schedule}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;