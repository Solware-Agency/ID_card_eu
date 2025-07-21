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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Contacto no encontrado</h1>
          <p className="text-gray-600">El perfil solicitado no existe.</p>
        </div>
      </div>
    );
  }

  const handleAction = (action: string) => {
    trackEvent(action, employee.name);
  };

  const formatPhoneForCall = (phone: string) => phone.replace(/\s+/g, '');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const IconButton: React.FC<{
    icon: React.ReactNode;
    onClick?: () => void;
    href?: string;
    target?: string;
    rel?: string;
    className?: string;
    variant?: 'primary' | 'secondary' | 'success' | 'social' | 'language';
  }> = ({ icon, onClick, href, target, rel, className = '', variant = 'primary' }) => {
    const baseClasses = "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg";
    
    const variantClasses = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white",
      secondary: "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
      success: "bg-green-500 hover:bg-green-600 text-white",
      social: "bg-blue-700 hover:bg-blue-800 text-white",
      language: "bg-white bg-opacity-20 backdrop-blur-sm text-white hover:bg-opacity-30 border-0 !w-10 !h-10 !rounded-xl"
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className={combinedClasses}
        >
          {icon}
        </a>
      );
    }

    return (
      <button onClick={onClick} className={combinedClasses}>
        {icon}
      </button>
    );
  };

  const ActionButton: React.FC<{
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    target?: string;
    rel?: string;
    download?: boolean;
    variant?: 'primary' | 'secondary';
    className?: string;
  }> = ({ children, onClick, href, target, rel, download, variant = 'primary', className = '' }) => {
    const baseClasses = "w-full py-4 px-6 rounded-2xl font-medium text-center transition-all duration-200 hover:shadow-lg";
    
    const variantClasses = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white",
      secondary: "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

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
          {children}
        </a>
      );
    }

    return (
      <button onClick={onClick} className={combinedClasses}>
        {children}
      </button>
    );
  };

  // Filter available contact options (removed download button)
  const contactOptions = [
    {
      icon: <Mail size={24} />,
      href: `mailto:${employee.email}`,
      action: 'click_email',
      variant: 'primary' as const
    },
    {
      icon: <Phone size={24} />,
      href: `tel:${formatPhoneForCall(employee.phone)}`,
      action: 'click_call',
      variant: 'primary' as const
    },
    {
      icon: <MessageCircle size={24} />,
      href: `https://wa.me/${employee.whatsapp}`,
      target: '_blank',
      rel: 'noopener noreferrer',
      action: 'click_whatsapp',
      variant: 'success' as const
    },
    ...(employee.linkedin ? [{
      icon: <Linkedin size={24} />,
      href: `https://linkedin.com/in/${employee.linkedin}`,
      target: '_blank',
      rel: 'noopener noreferrer',
      action: 'click_social',
      variant: 'social' as const
    }] : []),
    ...(employee.website ? [{
      icon: <Globe size={24} />,
      href: `https://${employee.website}`,
      target: '_blank',
      rel: 'noopener noreferrer',
      action: 'click_social',
      variant: 'primary' as const
    }] : [])
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        {/* Main card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-center relative">
            {/* Language toggle - top right */}
            <div className="absolute top-4 right-4">
              <IconButton
                icon={<Globe2 size={16} />}
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                variant="language"
              />
            </div>

            {/* Profile initials circle */}
            <div className="w-28 h-28 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white border-opacity-30">
              <span className="text-6xl font-bold text-white">
                {getInitials(employee.name)}
              </span>
            </div>

            {/* Name and title */}
            <h1 className="text-2xl font-bold text-white mb-2">
              {employee.name}
            </h1>
            <p className="text-blue-100 mb-1">
              {employee.title[language]}
            </p>
            <p className="text-blue-200 text-sm">
              {employee.company[language]}
            </p>
          </div>

          {/* Contact section */}
          <div className="p-8">
            {/* Icon grid section - 2 columns, up to 3 rows */}
            <div className="mb-8">
              <div className="grid grid-cols-3 gap-4 justify-items-center">
                {contactOptions.map((option, index) => (
                  <IconButton
                    key={index}
                    icon={option.icon}
                    href={option.href}
                    target={option.target}
                    rel={option.rel}
                    onClick={() => handleAction(option.action)}
                    variant={option.variant}
                  />
                ))}
              </div>
            </div>

            {/* Action buttons section */}
            <div className="space-y-8">
              {/* Save contact button */}
              <ActionButton
                href={`/vcf/${employee.slug}.vcf`}
                download
                onClick={() => handleAction('click_save_contact')}
                variant="primary"
                className="mb-4"
              >
                GUARDAR CONTACTO
              </ActionButton>

              {/* Schedule meeting button - only show if calendly exists */}
              {employee.calendly && (
                <ActionButton
                  href={employee.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleAction('click_agendar')}
                  variant="secondary"
                  className="mt-4"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Calendar size={20} />
                    AGENDAR REUNIÓN
                  </div>
                </ActionButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;