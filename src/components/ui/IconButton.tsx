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
  const baseClasses = "w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-md";
  const combinedClasses = `${baseClasses} ${BUTTON_VARIANTS[variant]} ${className}`;

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

export default IconButton;