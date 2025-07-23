import React from 'react';
import { Globe2 } from 'lucide-react';
import BlurText from '../BlurText';
import IconButton from '../ui/IconButton';
import { IMAGES, ANIMATION_DELAYS } from '../../constants';
import type { Employee, Language } from '../../types';

interface ContactHeaderProps {
  employee: Employee;
  language: Language['code'];
  onLanguageToggle: () => void;
}

const ContactHeader: React.FC<ContactHeaderProps> = ({
  employee,
  language,
  onLanguageToggle
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-800/90 to-indigo-900/90 backdrop-blur-sm p-4 sm:p-6 text-center relative border-b border-white/10">
      {/* Language toggle - top right */}
      <div className="absolute top-4 right-4">
        <IconButton
          icon={<Globe2 size={16} />}
          onClick={onLanguageToggle}
          variant="language"
          ariaLabel={`Cambiar idioma a ${language === 'es' ? 'inglés' : 'español'}`}
        />
      </div>

      {/* Profile photo */}
      <div 
        className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden shadow-lg"
        style={{
          boxShadow: 'inset 0 0 0 3px rgba(255, 255, 255, 0.8), 0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}
      >
        <img 
          src={IMAGES.EMPLOYEE_PHOTO}
          alt={employee.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name and title */}
      <div className="text-center w-full flex justify-center">
        <BlurText
          text={employee.name}
          delay={ANIMATION_DELAYS.BLUR_TEXT}
          animateBy="words"
          direction="top"
          stepDuration={ANIMATION_DELAYS.STEP_DURATION}
          threshold={0.05}
          animationFrom={{ 
            filter: "blur(15px)", 
            opacity: 0, 
            y: -30,
            scale: 0.9
          }}
          animationTo={[
            { 
              filter: "blur(8px)", 
              opacity: 0.3, 
              y: -10,
              scale: 0.95
            },
            { 
              filter: "blur(3px)", 
              opacity: 0.7, 
              y: -2,
              scale: 0.98
            },
            { 
              filter: "blur(0px)", 
              opacity: 1, 
              y: 0,
              scale: 1
            }
          ]}
          className="text-2xl font-bold text-white mb-4 text-center"
        />
      </div>
      
      <div className="text-center w-full">
        <p className="text-white/90 mb-1 text-sm sm:text-base px-2 text-center font-medium">
          {employee.title[language]}
        </p>
        <p className="text-white/80 text-xs sm:text-sm px-2 text-center">
          {employee.company[language]}
        </p>
      </div>
    </div>
  );
};

export default ContactHeader;