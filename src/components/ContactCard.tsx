import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, MessageCircle, Linkedin, Globe, Calendar, Download, Globe2 } from 'lucide-react';
import BlurText from './BlurText';
import FadeContent from './FadeContent';
import WorkButton from '../../components/animata/button/work-button';
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
    variant?: 'primary' | 'secondary' | 'success' | 'social' | 'language' | 'solware';
    ariaLabel?: string;
  }> = ({ icon, onClick, href, target, rel, className = '', variant = 'primary', ariaLabel }) => {
    const baseClasses = "w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-md";
    
    const variantClasses = {
      primary: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-md hover:shadow-lg",
      secondary: "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 shadow-md hover:shadow-lg",
      success: "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white shadow-md hover:shadow-lg",
      social: "bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white shadow-md hover:shadow-lg",
      solware: "bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 active:from-blue-700 active:to-blue-900 text-white shadow-md hover:shadow-lg",
      language: "bg-white bg-opacity-20 backdrop-blur-sm text-white hover:bg-opacity-30 active:bg-opacity-40 border-0 !w-8 !h-8 sm:!w-10 sm:!h-10 !rounded-xl focus:ring-white focus:ring-opacity-50"
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
          aria-label={ariaLabel}
        >
          {icon}
        </a>
      );
    }

    return (
      <button onClick={onClick} className={combinedClasses} aria-label={ariaLabel}>
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
    ariaLabel?: string;
  }> = ({ children, onClick, href, target, rel, download, variant = 'primary', className = '', ariaLabel }) => {
    const baseClasses = "w-full py-3 sm:py-4 px-3 sm:px-6 rounded-xl font-medium text-center transition-all duration-300 hover:shadow-xl active:scale-98 focus:outline-none focus:ring-4 focus:ring-blue-300 text-sm sm:text-base leading-tight";
    
    const variantClasses = {
      primary: "bg-blue-600 hover:bg-white hover:text-blue-600 hover:border-2 hover:border-blue-600 active:bg-blue-800 active:text-white active:border-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300",
      secondary: "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 active:bg-blue-100 active:text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
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
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }

    return (
      <button onClick={onClick} className={combinedClasses} aria-label={ariaLabel}>
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
      variant: 'primary' as const,
      ariaLabel: `Enviar correo electrónico a ${employee.name}`,
      label: 'Correo'
    },
    {
      icon: <MessageCircle size={24} />,
      href: `https://wa.me/${employee.whatsapp}`,
      target: '_blank',
      rel: 'noopener noreferrer',
      action: 'click_whatsapp',
      variant: 'success' as const,
      ariaLabel: `Enviar mensaje de WhatsApp a ${employee.name}`,
      label: 'WhatsApp'
    },
    ...(employee.linkedin ? [{
      icon: <Linkedin size={24} />,
      href: `https://linkedin.com/in/${employee.linkedin}`,
      target: '_blank',
      rel: 'noopener noreferrer',
      action: 'click_social',
      variant: 'social' as const,
      ariaLabel: `Ver perfil de LinkedIn de ${employee.name}`,
      label: 'LinkedIn'
    }] : []),
    ...(employee.website ? [{
      icon: <img src="https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Logos/Svg/Logo_Blanco_Solware.svg" alt="Solware" className="w-8 h-8" />,
      href: `https://${employee.website}`,
      target: '_blank',
      rel: 'noopener noreferrer',
      action: 'click_social',
      variant: 'solware' as const,
      ariaLabel: `Visitar sitio web de ${employee.company[language]}`,
      label: 'Solware'
    }] : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-sm w-full mx-auto">
        <FadeContent 
          blur={true} 
          duration={2000} 
          easing="ease-out" 
          initialOpacity={0}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden relative mx-4 sm:mx-0"
        >
          {/* Main card */}
          <div>
            {/* Header with gradient background */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 sm:p-6 text-center relative">
              {/* Language toggle - top right */}
              <div className="absolute top-4 right-4">
                <IconButton
                  icon={<Globe2 size={16} />}
                  onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                  variant="language"
                  ariaLabel={`Cambiar idioma a ${language === 'es' ? 'inglés' : 'español'}`}
                />
              </div>

              {/* Profile initials circle */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 border-4 border-white border-opacity-30">
                <span className="text-4xl sm:text-5xl font-bold text-white">
                  {getInitials(employee.name)}
                </span>
              </div>
              {/* Name and title */}
              <BlurText
                text={employee.name}
                delay={400}
                animateBy="words"
                direction="top"
                stepDuration={0.8}
                threshold={0.05}
                animationFrom={{ 
                  filter: "blur(15px)", 
                  opacity: 0, 
                  y: -30,
                  scale: 0.9
                }}
                animationTo={[
                  { 
                    filter: "blur(8px)", 
                    opacity: 0.3, 
                    y: -10,
                    scale: 0.95
                  },
                  { 
                    filter: "blur(3px)", 
                    opacity: 0.7, 
                    y: -2,
                    scale: 0.98
                  },
                  { 
                    filter: "blur(0px)", 
                    opacity: 1, 
                    y: 0,
                    scale: 1
                  }
                ]}
                className="text-2xl font-bold text-white mb-4 text-center"
              />
              <p className="text-blue-100 mb-1 text-sm sm:text-base px-2">
                {employee.title[language]}
              </p>
              <p className="text-blue-200 text-xs sm:text-sm text-center px-2">
                {employee.company[language]}
              </p>
            </div>

            {/* Contact section */}
            <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
              {/* Icon grid section - 4 circular buttons */}
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 justify-items-center">
                  {contactOptions.map((option, index) => (
                    <IconButton
                      key={index}
                      icon={option.icon}
                      href={option.href}
                      target={option.target}
                      rel={option.rel}
                      onClick={() => handleAction(option.action)}
                      variant={option.variant}
                      ariaLabel={option.ariaLabel}
                    />
                  ))}
                </div>
              </div>

              {/* Action buttons section */}
              <div className="mt-4 sm:mt-6 px-1 sm:px-2">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full">
                  <a
                    href={`/vcf/${employee.slug}.vcf`}
                    download
                    onClick={() => handleAction('click_save_contact')}
                    className="w-full sm:flex-1 sm:min-w-0"
                    aria-label={`Guardar contacto de ${employee.name}`}
                  >
                    <div className="group relative overflow-hidden rounded-full bg-blue-600 px-6 sm:px-14 py-3 sm:py-4 text-sm sm:text-lg transition-all w-full">
                      <span className="absolute bottom-0 left-0 h-48 w-full origin-bottom translate-y-full transform overflow-hidden rounded-full bg-white/15 transition-all duration-300 ease-out group-hover:translate-y-14"></span>
                      <span className="font-semibold text-white text-center block">Conecta conmigo</span>
                    </div>
                  </a>
                  {employee.calendly && (
                    <a
                      href={employee.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleAction('click_schedule')}
                      className="w-full sm:flex-1 sm:min-w-0"
                      aria-label={`Programar una cita con ${employee.name}`}
                    >
                      <div className="group relative overflow-hidden rounded-full bg-white border-2 border-blue-600 px-6 sm:px-14 py-3 sm:py-4 text-sm sm:text-lg transition-all w-full">
                        <span className="absolute bottom-0 left-0 h-48 w-full origin-bottom translate-y-full transform overflow-hidden rounded-full bg-blue-600/15 transition-all duration-300 ease-out group-hover:translate-y-14"></span>
                        <span className="font-semibold text-blue-600 text-center block">Agendar reunión</span>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </div>
    </div>
  );
};

export default ContactCard;