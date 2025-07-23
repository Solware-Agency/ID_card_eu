import React from 'react';
import { trackEvent } from '../../utils/analytics';
import type { Employee, Language } from '../../types';

interface ContactActionsProps {
  employee: Employee;
  language: Language['code'];
}

const ContactActions: React.FC<ContactActionsProps> = ({ employee, language }) => {
  const handleAction = (action: string) => {
    trackEvent(action, employee.name);
  };

  return (
    <div className="mt-4 sm:mt-6 px-1 sm:px-2">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full">
        <a
          href={`/vcf/${employee.slug}.vcf`}
          download
          onClick={() => handleAction('click_save_contact')}
          className="w-full sm:flex-1 sm:min-w-0 sm:max-w-48"
          aria-label={`Guardar contacto de ${employee.name}`}
        >
          <button 
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 backdrop-blur-sm px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base transition-all w-full hover:from-indigo-500 hover:to-purple-500"
            style={{
              boxShadow: 'inset 0 0 0 3px rgba(255, 255, 255, 0.8), 0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            <span className="absolute bottom-0 left-0 h-48 w-full origin-bottom translate-y-full transform overflow-hidden rounded-full bg-white/30 transition-all duration-300 ease-out group-hover:translate-y-14"></span>
            <span className="font-bold text-white text-center block leading-tight mx-auto relative z-10 group-hover:drop-shadow-lg transition-all duration-200">
              {language === 'es' ? 'Guardar' : 'Save'}<br />
              {language === 'es' ? 'contacto' : 'contact'}
            </span>
          </button>
        </a>
        
        {employee.calendly && (
          <a
            href={employee.calendly}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleAction('click_schedule')}
            className="w-full sm:flex-1 sm:min-w-0 sm:max-w-48"
            aria-label={`Programar una cita con ${employee.name}`}
          >
            <button 
              className="group relative overflow-hidden rounded-full bg-slate-800/30 backdrop-blur-sm px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base transition-all w-full hover:bg-slate-700/40"
              style={{
                boxShadow: 'inset 0 0 0 2px rgba(255, 255, 255, 0.7), 0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <span className="absolute bottom-0 left-0 h-48 w-full origin-bottom translate-y-full transform overflow-hidden rounded-full bg-indigo-500/25 transition-all duration-300 ease-out group-hover:translate-y-14"></span>
              <span className="font-medium text-white/90 group-hover:text-white text-center block leading-tight mx-auto relative z-10 group-hover:drop-shadow-lg transition-all duration-300">
                {language === 'es' ? 'Pongamos' : 'Let\'s set'}<br />
                {language === 'es' ? 'fecha' : 'a date'}
              </span>
            </button>
          </a>
        )}
      </div>
    </div>
  );
};

export default ContactActions;