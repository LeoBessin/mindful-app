'use client';

import { useEffect, useState } from 'react';
import i18n from '../lib/i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Only after hydration is complete, detect and set the preferred language
    setIsHydrated(true);

    // Try to get language from localStorage first
    const savedLanguage = localStorage.getItem('i18nextLng');
    let preferredLanguage = 'en'; // default

    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      preferredLanguage = savedLanguage;
    } else {
      // Fallback to browser language detection
      const browserLang = navigator.language?.split('-')[0];
      if (browserLang === 'fr') {
        preferredLanguage = 'fr';
      }
    }

    // Change language if different from current
    if (i18n.language !== preferredLanguage) {
      i18n.changeLanguage(preferredLanguage);
    }
  }, []);

  return <>{children}</>;
}
