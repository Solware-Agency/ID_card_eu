import React from 'react';
import { Globe2 } from 'lucide-react';
import BlurText from '../BlurText';
import IconButton from '../ui/IconButton';
import GlassCard from '../ui/GlassCard';
import { IMAGES, ANIMATION_CONFIG, ELEMENT_STYLES, TEXT_CONTENT } from '../../constants';
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
    <GlassCard variant="header" className="p-4 sm:p-6 text-center relative">
      <div className="absolute top-4 right-4">
        <IconButton
          icon={<Globe2 size={16} />}
          onClick={onLanguageToggle}
          variant="language"
          ariaLabel={`${TEXT_CONTENT[language].languageToggle} ${language === 'es' ? 'inglés' : 'español'}`}
        />
      </div>

      <div 
        className={`${ELEMENT_STYLES.avatar.size} bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden`}
        style={{ boxShadow: ELEMENT_STYLES.avatar.boxShadow }}
      >
        <img 
          src={IMAGES.EMPLOYEE_PHOTO}
          alt={employee.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-center w-full flex justify-center">
        <BlurText
          text={employee.name}
          delay={ANIMATION_CONFIG.BLUR_TEXT.delay}
          animateBy="words"
          direction="top"
          stepDuration={ANIMATION_CONFIG.BLUR_TEXT.stepDuration}
          threshold={ANIMATION_CONFIG.BLUR_TEXT.threshold}
          animationFrom={{ 
            filter: "blur(15px)", 
            opacity: 0, 
            y: -30,
            scale: 0.9
          }}
          animationTo={[
            { filter: "blur(8px)", opacity: 0.3, y: -10, scale: 0.95 },
            { filter: "blur(3px)", opacity: 0.7, y: -2, scale: 0.98 },
            { filter: "blur(0px)", opacity: 1, y: 0, scale: 1 }
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
    </GlassCard>
  );
};

export default ContactHeader;