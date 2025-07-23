import React from 'react';
import { Mail, MessageCircle, Linkedin } from 'lucide-react';
import { IMAGES } from '../../constants';
import { trackEvent } from '../../utils/analytics';
import type { Employee, ContactOption } from '../../types';

interface ContactIconsProps {
  employee: Employee;
}

const ContactIcons: React.FC<ContactIconsProps> = ({ employee }) => {
  const handleAction = (action: string) => {
    trackEvent(action, employee.name);
  };

  const contactOptions: ContactOption[] = [
    {
      icon: <Mail size={24} />,
      href: `mailto:${employee.email}`,
      action: 'click_email',
      variant: 'primary',
      ariaLabel: `Enviar correo electrónico a ${employee.name}`,
      label: 'Correo'
    },
    {
      icon: <MessageCircle size={24} />,
      href: `https://wa.me/${employee.whatsapp}`,
      target: '_blank',
      rel: 'noopener noreferrer',
      action: 'click_whatsapp',
      variant: 'success',
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
      icon: <img src={IMAGES.SOLWARE_LOGO} alt="Solware" className="w-8 h-8" />,
      href: `https://${employee.website}`,
      target: '_blank',
      rel: 'noopener noreferrer',
      action: 'click_social',
      variant: 'solware' as const,
      ariaLabel: `Visitar sitio web de ${employee.company.es}`,
      label: 'Solware'
    }] : []),
  ];

  return (
    <div className="flex justify-center items-center gap-4 my-6">
      {contactOptions.map((option, index) => (
        <a
          key={index}
          href={option.href}
          target={option.target}
          rel={option.rel}
          onClick={() => handleAction(option.action)}
          className="group relative flex flex-col items-center justify-center bg-slate-800/60 hover:bg-indigo-600/80 backdrop-blur-sm rounded-full w-12 h-12 sm:w-14 sm:h-14 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/25 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:ring-offset-2 focus:ring-offset-transparent border-2 border-white/50 hover:border-indigo-300/90"
          aria-label={option.ariaLabel}
        >
          {/* Refuerzo del borde del icono */}
          <div className="absolute inset-0 rounded-full border border-white/30 pointer-events-none"></div>
          <div className="text-white/90 group-hover:text-white group-hover:drop-shadow-lg transition-all duration-300">
            {React.cloneElement(option.icon as React.ReactElement, {
              size: 20,
              className: "sm:w-6 sm:h-6"
            })}
          </div>
        </a>
      ))}
    </div>
  );
};

export default ContactIcons;