import React from 'react';
import { trackEvent } from '../../utils/analytics';
import { getContactOptions } from '../../utils/contactOptions';
import { ELEMENT_STYLES } from '../../constants';
import type { Employee } from '../../types';

interface ContactIconsProps {
  employee: Employee;
}

const ContactIcons: React.FC<ContactIconsProps> = ({ employee }) => {
  const handleAction = (action: string) => {
    trackEvent(action, employee.name);
  };

  const contactOptions = getContactOptions(employee);

  return (
    <div className="flex justify-center items-center gap-4 my-6">
      {contactOptions.map((option, index) => (
        <a
          key={index}
          href={option.href}
          target={option.target}
          rel={option.rel}
          onClick={() => handleAction(option.action)}
          className={`
            group relative flex flex-col items-center justify-center 
            ${ELEMENT_STYLES.contactIcon.base} ${ELEMENT_STYLES.contactIcon.size}
            transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/25 
            hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 
            focus:ring-indigo-400/60 focus:ring-offset-2 focus:ring-offset-transparent
          `}
          style={{ boxShadow: ELEMENT_STYLES.contactIcon.boxShadow }}
          aria-label={option.ariaLabel}
        >
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