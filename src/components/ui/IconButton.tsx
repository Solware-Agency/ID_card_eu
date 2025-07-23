import React from 'react';
import { BUTTON_VARIANTS } from '../../constants';
import type { ButtonVariant } from '../../types';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  variant?: ButtonVariant;
  ariaLabel?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  href,
  target,
  rel,
  className = '',
  variant = 'primary',
  ariaLabel
}) => {
  const baseClasses = "relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-md";
  const combinedClasses = `${baseClasses} ${className}`;
  
  const getBoxShadow = (variant: ButtonVariant) => {
    const shadows = {
      primary: 'inset 0 0 0 2px rgba(255, 255, 255, 0.8), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      secondary: 'inset 0 0 0 2px rgba(37, 99, 235, 1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      success: 'inset 0 0 0 2px rgba(255, 255, 255, 0.8), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      social: 'inset 0 0 0 2px rgba(255, 255, 255, 0.8), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      solware: 'inset 0 0 0 2px rgba(255, 255, 255, 0.8), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      language: 'inset 0 0 0 2px rgba(255, 255, 255, 0.5), 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    };
    return shadows[variant];
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={`${combinedClasses} ${BUTTON_VARIANTS[variant]}`}
        style={{ boxShadow: getBoxShadow(variant) }}
        aria-label={ariaLabel}
      >
        {icon}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className={`${combinedClasses} ${BUTTON_VARIANTS[variant]}`}
      style={{ boxShadow: getBoxShadow(variant) }}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

export default IconButton;