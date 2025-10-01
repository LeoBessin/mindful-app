'use client';

import { useEffect, useState } from 'react';
import i18n from '../lib/i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Only after hydration is complete, detect and set the preferred language
    setIsHydrated(true);

    // Try to get language from localStorage with the new key first
    const savedLanguage = localStorage.getItem('selectedLanguage');
    let preferredLanguage = 'en'; // default

    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      preferredLanguage = savedLanguage;
    } else {
      // Fallback to old i18nextLng key for backwards compatibility
      const oldSavedLanguage = localStorage.getItem('i18nextLng');
      if (oldSavedLanguage && (oldSavedLanguage === 'en' || oldSavedLanguage === 'fr')) {
        preferredLanguage = oldSavedLanguage;
        // Migrate to new key
        localStorage.setItem('selectedLanguage', oldSavedLanguage);
        localStorage.removeItem('i18nextLng');
      } else {
        // Fallback to browser language detection
        const browserLang = navigator.language?.split('-')[0];
        if (browserLang === 'fr') {
          preferredLanguage = 'fr';
        }
        // Save the detected language
        localStorage.setItem('selectedLanguage', preferredLanguage);
      }
    }

    // Change language if different from current
    if (i18n.language !== preferredLanguage) {
      i18n.changeLanguage(preferredLanguage);
    }
  }, []);

  return <>{children}</>;
}
