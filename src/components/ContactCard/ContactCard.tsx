import React from 'react';
import { useParams } from 'react-router-dom';
import FadeContent from '../FadeContent';
import AnimatedBackground from '../ui/AnimatedBackground';
import GlassCard from '../ui/GlassCard';
import ContactHeader from './ContactHeader';
import ContactIcons from './ContactIcons';
import ContactActions from './ContactActions';
import NotFound from './NotFound';
import { useLanguage } from '../../hooks/useLanguage';
import { useEmployee } from '../../hooks/useEmployee';
import { ANIMATION_CONFIG } from '../../constants';

const ContactCard: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, toggleLanguage } = useLanguage('es');
  const employee = useEmployee(slug);

  if (!employee) {
    return <NotFound />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-sm w-full mx-auto">
          <FadeContent 
            blur={true} 
            duration={ANIMATION_CONFIG.FADE_CONTENT.duration}
            easing={ANIMATION_CONFIG.FADE_CONTENT.easing}
            initialOpacity={ANIMATION_CONFIG.FADE_CONTENT.initialOpacity}
            className="relative mx-4 sm:mx-0 rounded-3xl overflow-hidden"
          >
            <GlassCard variant="main">
              <ContactHeader 
                employee={employee}
                language={language}
                onLanguageToggle={toggleLanguage}
              />

              <GlassCard variant="content" className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 relative">
                <div className="absolute top-0 left-3 right-3 h-0.5 bg-white/50"></div>
                <ContactIcons employee={employee} />
                <ContactActions employee={employee} language={language} />
              </GlassCard>
            </GlassCard>
          </FadeContent>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;