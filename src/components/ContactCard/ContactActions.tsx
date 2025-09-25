import React from 'react';
import { trackEvent } from '../../utils/analytics';
import { TEXT_CONTENT, ELEMENT_STYLES } from '../../constants';
import type { Employee, Language } from '../../types';

interface ContactActionsProps {
  employee: Employee;
  language: Language['code'];
}

const ContactActions: React.FC<ContactActionsProps> = ({ employee, language }) => {
  const handleAction = (action: string) => {
    trackEvent(action, employee.name);
  };

  const ActionButton: React.FC<{
    href?: string;
    target?: string;
    rel?: string;
    download?: boolean;
    onClick: () => void;
    ariaLabel: string;
    variant: 'primary' | 'secondary';
    children: React.ReactNode;
  }> = ({ href, target, rel, download, onClick, ariaLabel, variant, children }) => {
    const styles = ELEMENT_STYLES.actionButton[variant];
    const baseClasses = `
      group relative overflow-hidden rounded-full backdrop-blur-sm 
      px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base transition-all w-full
    `;

    const buttonProps = {
      className: `${baseClasses} ${styles.background}`,
      style: { boxShadow: styles.boxShadow },
      onClick,
      'aria-label': ariaLabel
    };

    const content = (
      <>
        <span className="absolute bottom-0 left-0 h-48 w-full origin-bottom translate-y-full transform overflow-hidden rounded-full bg-white/30 transition-all duration-300 ease-out group-hover:translate-y-14"></span>
        <span className="font-bold text-white text-center flex items-center justify-center leading-tight mx-auto relative z-10 group-hover:drop-shadow-lg transition-all duration-200">
          {children}
        </span>
      </>
    );

    if (href) {
      return (
        <a href={href} target={target} rel={rel} download={download} {...buttonProps}>
          {content}
        </a>
      );
    }

    return <button {...buttonProps}>{content}</button>;
  };

  return (
    <div className="mt-4 sm:mt-6 px-1 sm:px-2">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full">
        <ActionButton
          href={`https://wa.me/${employee.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleAction('click_whatsapp')}
          ariaLabel={`Enviar mensaje de WhatsApp a ${employee.name}`}
          variant="primary"
        >
          {TEXT_CONTENT[language].whatsapp}
        </ActionButton>
        
        {employee.calendly && (
          <ActionButton
            href={employee.calendly}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleAction('click_schedule')}
            ariaLabel={`Programar una cita con ${employee.name}`}
            variant="secondary"
          >
            {TEXT_CONTENT[language].scheduleMeeting}<br />
            {TEXT_CONTENT[language].scheduleMeetingSub}
          </ActionButton>
        )}
      </div>
    </div>
  );
};

export default ContactActions;