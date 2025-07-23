import React from 'react';
import { BUTTON_STYLES } from '../../constants';
import type { ButtonVariant } from '../../types';

interface StyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean;
  variant?: ButtonVariant;
  className?: string;
  ariaLabel?: string;
  size?: 'sm' | 'md' | 'lg';
}

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  onClick,
  href,
  target,
  rel,
  download,
  variant = 'primary',
  className = '',
  ariaLabel,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-sm sm:text-base',
    lg: 'px-8 py-4 text-base sm:text-lg'
  };

  const baseClasses = `
    rounded-full font-medium text-center transition-all duration-300 
    hover:scale-105 hover:shadow-xl active:scale-95 
    focus:outline-none focus:ring-2 focus:ring-indigo-300/60 
    ${sizeClasses[size]} ${className}
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
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        {...buttonProps}
      >
        {children}
      </a>
    );
  }

  return <button {...buttonProps}>{children}</button>;
};

export default StyledButton;