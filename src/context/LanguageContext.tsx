import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations, TranslationSchema } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode; initialLang?: Language }> = ({ 
  children, 
  initialLang = 'EN' 
}) => {
  const [language, setLanguageState] = useState<Language>(initialLang);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = translations[language] || translations.EN;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
