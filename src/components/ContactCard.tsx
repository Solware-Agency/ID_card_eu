import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, Linkedin, Globe, Calendar, Download, Globe2 } from 'lucide-react';
import BlurText from './BlurText';
import FadeContent from './FadeContent';
import WorkButton from '../../components/animata/button/work-button';
import AnimatedDock from '../../components/animata/container/animated-dock';
import { getEmployeeBySlug } from '../data/empleados';
import { trackEvent } from '../utils/analytics';
import { TEXT_CONTENT } from '../constants';
import type { Language } from '../types';

interface ContactCardProps {
  defaultSlug?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ defaultSlug }) => {
  const { slug } = useParams<{ slug: string }>();
  const [language, setLanguage] = useState<Language['code']>('es');
  
  // Usar el slug de la URL o el defaultSlug proporcionado
  const currentSlug = slug || defaultSlug;
  const employee = currentSlug ? getEmployeeBySlug(currentSlug) : null;

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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{TEXT_CONTENT.es.notFound}</h1>
          <p className="text-gray-600">{TEXT_CONTENT.es.notFoundDesc}</p>
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
      language: "bg-indigo-600/40 backdrop-blur-sm text-white hover:bg-indigo-500/60 hover:scale-105 hover:shadow-lg hover:shadow-indigo-400/30 active:bg-indigo-700/50 active:scale-95 border border-indigo-400/40 hover:border-indigo-300/70 !w-8 !h-8 sm:!w-10 sm:!h-10 !rounded-xl focus:ring-2 focus:ring-indigo-300/60 focus:ring-opacity-50 focus:outline-none transition-all duration-300"
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
    const baseClasses = "w-full py-3 sm:py-4 px-6 sm:px-10 rounded-xl font-medium text-center transition-all duration-300 hover:shadow-xl active:scale-98 focus:outline-none focus:ring-4 focus:ring-blue-300 text-sm sm:text-base leading-tight";
    
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

  // Filter available contact options (removed download button and whatsapp)
  const contactOptions = [
    {
      icon: <Mail size={24} />,
      href: `mailto:${employee.email}`,
      action: 'click_email',
      variant: 'primary' as const,
      ariaLabel: `Enviar correo electrónico a ${employee.name}`,
      label: 'Correo'
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
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated colorful background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-900">
          {/* Floating abstract shapes - less blurry and free movement */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-indigo-600/40 to-purple-600/40 rounded-full mix-blend-screen filter blur-lg opacity-60 animate-float-free-1"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-violet-600/40 to-blue-600/40 rounded-full mix-blend-screen filter blur-lg opacity-60 animate-float-free-2"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-gradient-to-r from-blue-600/40 to-indigo-600/40 rounded-full mix-blend-screen filter blur-lg opacity-60 animate-float-free-3"></div>
          <div className="absolute bottom-20 right-40 w-96 h-96 bg-gradient-to-r from-slate-600/30 to-indigo-600/40 rounded-full mix-blend-screen filter blur-lg opacity-50 animate-float-free-4"></div>
          <div className="absolute top-1/2 left-10 w-64 h-64 bg-gradient-to-r from-emerald-500/35 to-teal-600/35 rounded-full mix-blend-screen filter blur-lg opacity-55 animate-float-free-5"></div>
          <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-rose-500/30 to-pink-600/30 rounded-full mix-blend-screen filter blur-lg opacity-50 animate-float-free-6"></div>
          
          {/* Aurora-like overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-indigo-500/10 to-transparent animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-pulse animation-delay-3000"></div>
        </div>
        
      </div>
      
      {/* Content container */}
      <div className="relative z-10 h-screen flex items-center justify-center p-2 sm:p-4">
        <div className="max-w-sm w-full mx-auto">
          <FadeContent 
            blur={true} 
            duration={2000} 
            easing="ease-out" 
            initialOpacity={0}
            className="relative mx-2 sm:mx-0"
          >
            {/* Glassmorphism card */}
            <div 
              className="backdrop-blur-2xl bg-white/25 border border-white/18 shadow-2xl rounded-3xl overflow-hidden"
              style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
              }}
            >
              {/* Header with gradient background */}
              <div className="bg-gradient-to-br from-slate-800/90 to-indigo-900/90 backdrop-blur-sm p-3 sm:p-4 text-center relative border-b border-white/10 rounded-t-3xl">
                {/* IESA Logo - top left */}
                <div className="absolute top-4 left-4">
                  <img 
                    src="/iesa.webp" 
                    alt="IESA Logo" 
                    className="w-12 h-12 object-contain shadow-lg"
                  />
                </div>
                
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 border-4 border-indigo-400/30 overflow-hidden shadow-lg">
                  <img 
                    src={employee.photo}
                    alt={employee.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Name and title */}
                <div className="text-center w-full flex justify-center">
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
                    className="text-xl sm:text-2xl font-bold text-white mb-2 text-center"
                  />
                </div>
                <div className="text-center w-full">
                  <p className="text-white/90 mb-1 text-xs sm:text-sm px-2 text-center font-medium">
                    {employee.title[language]}
                  </p>
                  <p className="text-white/80 text-xs px-2 text-center">
                    {employee.company[language]}
                  </p>
                </div>
              </div>

              {/* Contact section */}
              <div className="p-3 sm:p-4 space-y-4 sm:space-y-6 bg-white/10 backdrop-blur-sm rounded-b-3xl">
                
                {/* Horizontal action buttons section */}
                <div className="flex justify-center items-center gap-3 my-4">
                  {contactOptions.map((option, index) => (
                    <a
                      key={index}
                      href={option.href}
                      target={option.target}
                      rel={option.rel}
                      onClick={() => handleAction(option.action)}
                      className="group relative flex flex-col items-center justify-center bg-slate-800/60 hover:bg-indigo-600/80 backdrop-blur-sm rounded-full w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/25 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:ring-offset-2 focus:ring-offset-transparent border border-indigo-400/30 hover:border-indigo-400/40 hover:border-2"
                      aria-label={option.ariaLabel}
                    >
                      <div className="text-white/90 group-hover:text-white group-hover:drop-shadow-lg transition-all duration-300">
                        {React.cloneElement(option.icon as React.ReactElement, {
                          size: 16,
                          className: "sm:w-5 sm:h-5"
                        })}
                      </div>
                    </a>
                  ))}
                </div>

                {/* Action buttons section */}
                <div className="mt-3 sm:mt-4 px-1 sm:px-2">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-stretch w-full">
                    <a
                      href={`https://wa.me/${employee.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleAction('click_whatsapp')}
                      className="flex-1"
                      aria-label={`Enviar mensaje de WhatsApp a ${employee.name}`}
                    >
                      <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 backdrop-blur-sm border border-indigo-400/50 px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all w-full h-10 sm:h-12 shadow-xl hover:shadow-2xl hover:from-indigo-500 hover:to-purple-500 flex items-center justify-center">
                        <span className="absolute bottom-0 left-0 h-48 w-full origin-bottom translate-y-full transform overflow-hidden rounded-full bg-white/30 transition-all duration-300 ease-out group-hover:translate-y-14"></span>
                        <span className="font-bold text-white text-center leading-tight relative z-10 group-hover:drop-shadow-lg transition-all duration-200 whitespace-nowrap">
                          {TEXT_CONTENT[language].whatsapp}
                        </span>
                      </button>
                    </a>
                    {employee.calendly && (
                      <a
                        href={employee.calendly}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleAction('click_schedule')}
                        className="flex-1"
                        aria-label={`Programar una cita con ${employee.name}`}
                      >
                        <button className="group relative overflow-hidden rounded-full bg-slate-800/30 backdrop-blur-sm border-2 border-slate-600/40 px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all w-full h-10 sm:h-12 shadow-lg hover:shadow-xl hover:bg-slate-700/40 flex items-center justify-center">
                          <span className="absolute bottom-0 left-0 h-48 w-full origin-bottom translate-y-full transform overflow-hidden rounded-full bg-indigo-500/25 transition-all duration-300 ease-out group-hover:translate-y-14"></span>
                          <span className="font-bold text-white text-center leading-tight relative z-10 group-hover:drop-shadow-lg transition-all duration-200 whitespace-nowrap">
                            {TEXT_CONTENT[language].scheduleMeeting}
                          </span>
                        </button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FadeContent>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;