import React, { createContext, useState, useContext } from 'react';

import { translations } from '../utils/i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en'); // 'en' or 'bn'

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'bn' : 'en');
  };

  const t = (key) => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
