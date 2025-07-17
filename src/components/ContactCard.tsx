import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, MessageCircle, Linkedin, Globe, Calendar, Download, Globe2 } from 'lucide-react';
import { getEmployeeBySlug } from '../data/empleados';
import { trackEvent } from '../utils/analytics';
import type { Language } from '../types';

const ContactCard: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [language, setLanguage] = useState<Language['code']>('es');
  const employee = slug ? getEmployeeBySlug(slug) : null;

  const tooltips = {
    es: {
      email: 'Enviar correo electrónico',
      phone: 'Llamar por teléfono',
      whatsapp: 'Enviar mensaje por WhatsApp',
      linkedin: 'Ver perfil de LinkedIn',
      website: 'Visitar sitio web',
      save: 'Guardar contacto',
      schedule: 'Agendar reunión',
      language: 'Cambiar idioma',
      notFound: 'Contacto no encontrado',
      notFoundDesc: 'El perfil solicitado no existe.'
    },
    en: {
      email: 'Send email',
      phone: 'Make phone call',
      whatsapp: 'Send WhatsApp message',
      linkedin: 'View LinkedIn profile',
      website: 'Visit website',
      save: 'Save contact',
      schedule: 'Schedule meeting',
      language: 'Change language',
      notFound: 'Contact not found',
      notFoundDesc: 'The requested profile does not exist.'
    }
  };

  const strings = tooltips[language];

  useEffect(() => {
    if (employee) {
      trackEvent('page_view', employee.name);
      document.title = `${employee.name} - SolwareID`;
    }
  }, [employee]);

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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

  const IconButton: React.FC<{
    icon: React.ReactNode;
    onClick?: () => void;
    href?: string;
    target?: string;
    rel?: string;
    download?: boolean;
    className?: string;
    tooltip: string;
    variant?: 'primary' | 'secondary' | 'success' | 'social';
  }> = ({ icon, onClick, href, target, rel, download, className = '', tooltip, variant = 'primary' }) => {
    const baseClasses = "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg relative group";
    
    const variantClasses = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white",
      secondary: "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
      success: "bg-green-500 hover:bg-green-600 text-white",
      social: "bg-blue-700 hover:bg-blue-800 text-white"
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

    const content = (
      <>
        {icon}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          download={download}
          onClick={onClick}
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }

    return (
      <button onClick={onClick} className={combinedClasses}>
        {content}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        {/* Header with gradient background */}
        <div 
          className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-t-3xl h-48 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0C1E5B 0%, #1e40af 100%)' }}
        >
          <div className="absolute bottom-0 right-0 opacity-10">
            <div className="text-6xl font-bold text-white transform rotate-12"></div>
          </div>
          
          {/* Language toggle */}
          <div className="absolute top-4 right-4">
            <IconButton
              icon={<Globe2 size={18} />}
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              tooltip={strings.language}
              className="!w-10 !h-10 !rounded-xl bg-white bg-opacity-20 backdrop-blur-sm text-white hover:bg-opacity-30 border-0"
            />
          </div>
        </div>

        {/* Main card content */}
        <div className="bg-white rounded-b-3xl shadow-2xl p-8 -mt-16 relative z-10">
          {/* Profile section */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-28 h-28 rounded-full overflow-hidden mb-6 border-4 border-white shadow-xl">
              <img
                src={employee.photo}
                alt={employee.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=0C1E5B&color=fff&size=112`;
                }}
              />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{employee.name}</h1>
            <p className="text-gray-600 mb-1">{employee.title[language]}</p>
            <p className="text-blue-700 font-medium text-sm italic">{employee.company[language]}</p>
          </div>

          {/* Contact actions grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* Email */}
            <IconButton
              icon={<Mail size={20} />}
              href={`mailto:${employee.email}`}
              onClick={() => handleAction('click_email')}
              tooltip={strings.email}
              variant="primary"
            />

            {/* Phone */}
            <IconButton
              icon={<Phone size={20} />}
              href={`tel:${formatPhoneForCall(employee.phone)}`}
              onClick={() => handleAction('click_call')}
              tooltip={strings.phone}
              variant="primary"
            />

            {/* WhatsApp */}
            <IconButton
              icon={<MessageCircle size={20} />}
              href={`https://wa.me/${employee.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleAction('click_whatsapp')}
              tooltip={strings.whatsapp}
              variant="success"
            />

            {/* LinkedIn */}
            {employee.linkedin && (
              <IconButton
                icon={<Linkedin size={20} />}
                href={`https://linkedin.com/in/${employee.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleAction('click_social')}
                tooltip={strings.linkedin}
                variant="social"
              />
            )}

            {/* Website */}
            {employee.website && (
              <IconButton
                icon={<Globe size={20} />}
                href={`https://${employee.website}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleAction('click_social')}
                tooltip={strings.website}
                variant="primary"
              />
            )}
          </div>

          {/* Primary actions */}
          <div className="flex gap-4 justify-center">
            {/* Save contact */}
            <IconButton
              icon={<Download size={22} />}
              href={`/vcf/${employee.slug}.vcf`}
              download
              onClick={() => handleAction('click_save_contact')}
              tooltip={strings.save}
              variant="secondary"
              className="!w-16 !h-16"
            />

            {/* Schedule meeting */}
            {employee.calendly && (
              <IconButton
                icon={<Calendar size={22} />}
                href={employee.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleAction('click_agendar')}
                tooltip={strings.schedule}
                variant="secondary"
                className="!w-16 !h-16"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;