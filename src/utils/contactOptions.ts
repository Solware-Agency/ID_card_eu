import React from 'react';
import { Mail, Linkedin } from 'lucide-react';
import { IMAGES } from '../constants';
import type { Employee, ContactOption } from '../types';

export const getContactOptions = (employee: Employee): ContactOption[] => [
  {
    icon: <Mail size={24} />,
    href: `mailto:${employee.email}`,
    action: 'click_email',
    variant: 'primary',
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