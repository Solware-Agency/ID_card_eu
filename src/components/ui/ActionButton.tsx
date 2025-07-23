import React from 'react';

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
  ariaLabel?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  href,
  target,
  rel,
  download,
  variant = 'primary',
  className = '',
  ariaLabel
}) => {
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

export default ActionButton;