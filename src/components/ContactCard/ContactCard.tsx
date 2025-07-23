import React from 'react';
import { useParams } from 'react-router-dom';
import FadeContent from '../FadeContent';
import AnimatedBackground from '../ui/AnimatedBackground';
import ContactHeader from './ContactHeader';
import ContactIcons from './ContactIcons';
import ContactActions from './ContactActions';
import { useLanguage } from '../../hooks/useLanguage';
import { useEmployee } from '../../hooks/useEmployee';
import { ANIMATION_DELAYS, BLUR_EFFECTS } from '../../constants';

const ContactCard: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, toggleLanguage } = useLanguage('es');
  const employee = useEmployee(slug);

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Contacto no encontrado</h1>
          <p className="text-gray-600">El perfil solicitado no existe.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <AnimatedBackground />
      
      {/* Content container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-sm w-full mx-auto">
          <FadeContent 
            blur={true} 
            duration={ANIMATION_DELAYS.FADE_CONTENT} 
            easing="ease-out" 
            initialOpacity={0}
            className="relative mx-4 sm:mx-0 rounded-3xl overflow-hidden"
          >
            {/* Glassmorphism card */}
            <div 
              className="backdrop-blur-2xl bg-white/25 border-2 border-white/70 shadow-2xl relative"
              style={{
                backdropFilter: BLUR_EFFECTS.CARD_BLUR,
                WebkitBackdropFilter: BLUR_EFFECTS.WEBKIT_BLUR
              }}
            >
              {/* Refuerzo del borde con pseudo-elemento */}
              <div className="absolute inset-0 rounded-3xl border-2 border-white/50 pointer-events-none"></div>
              
              <ContactHeader 
                employee={employee}
                language={language}
                onLanguageToggle={toggleLanguage}
              />

              {/* Contact section */}
              <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 bg-white/10 backdrop-blur-sm border-t-2 border-white/40">
                <ContactIcons employee={employee} />
                <ContactActions employee={employee} language={language} />
              </div>
            </div>
          </FadeContent>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;