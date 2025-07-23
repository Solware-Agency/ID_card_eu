import { useState } from 'react';
import type { Language } from '../types';

export const useLanguage = (initialLanguage: Language['code'] = 'es') => {
  const [language, setLanguage] = useState<Language['code']>(initialLanguage);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return {
    language,
    setLanguage,
    toggleLanguage,
  };
};