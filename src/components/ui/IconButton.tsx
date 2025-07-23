import React from 'react';
import { BUTTON_STYLES } from '../../constants';
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
  const baseClasses = `
    relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center 
    transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 
    focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-md ${className}
  `.trim();

  const buttonStyle = BUTTON_STYLES[variant];
  const combinedClasses = `${baseClasses} ${buttonStyle.base}`;

  const buttonProps = {
    className: combinedClasses,
    style: { boxShadow: buttonStyle.boxShadow },
    'aria-label': ariaLabel,
    onClick
  };

  if (href) {
    return (
      <a href={href} target={target} rel={rel} {...buttonProps}>
        {icon}
      </a>
    );
  }

  return <button {...buttonProps}>{icon}</button>;
};

export default IconButton;