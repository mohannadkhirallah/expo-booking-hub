import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.explore': 'Explore Venues',
    'nav.howItWorks': 'How It Works',
    'nav.myBookings': 'My Bookings',
    'nav.signIn': 'Sign In / Register',
    
    // Hero
    'hero.title': 'Expo City Dubai Venue Booking Portal',
    'hero.subtitle': 'Discover our iconic venues and bring your next event to life at Expo City Dubai.',
    'hero.exploreBtn': 'Explore Venues',
    'hero.startBooking': 'Start a Booking',
    
    // Benefits
    'benefits.venues.title': 'Iconic Venues',
    'benefits.venues.desc': 'From the stunning Al Wasl Plaza to the state-of-the-art Terra Auditorium and Mobility District Plaza – host unforgettable events.',
    'benefits.support.title': 'End-to-End Support',
    'benefits.support.desc': 'Comprehensive services including security, licensing, F&B catering, and logistics coordination for your event.',
    'benefits.tracking.title': 'Transparent Tracking',
    'benefits.tracking.desc': 'Monitor your booking status in real-time through "My Bookings" – from submission to final approval.',
    
    // How it works
    'how.title': 'How It Works',
    'how.step1.title': 'Explore Venues',
    'how.step1.desc': 'Browse our collection of world-class venues and find the perfect space for your event.',
    'how.step2.title': 'Submit Request',
    'how.step2.desc': 'Complete the booking form with your event details and requirements.',
    'how.step3.title': 'Track Approvals',
    'how.step3.desc': 'Monitor your request status and receive confirmation once approved.',
    
    // Footer
    'footer.faqs': 'FAQs & Guidelines',
    'footer.contact': 'Contact Support',
    'footer.website': 'Expo City Dubai',
    'footer.rights': '© 2025 Expo City Dubai. All rights reserved.',
    
    // Common
    'common.loginRequired': 'Login required',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.explore': 'استكشف الأماكن',
    'nav.howItWorks': 'كيف يعمل',
    'nav.myBookings': 'حجوزاتي',
    'nav.signIn': 'تسجيل الدخول / التسجيل',
    
    // Hero
    'hero.title': 'بوابة حجز الأماكن في إكسبو سيتي دبي',
    'hero.subtitle': 'اكتشف أماكننا المميزة وأحيِ فعاليتك القادمة في إكسبو سيتي دبي.',
    'hero.exploreBtn': 'استكشف الأماكن',
    'hero.startBooking': 'ابدأ الحجز',
    
    // Benefits
    'benefits.venues.title': 'أماكن مميزة',
    'benefits.venues.desc': 'من ساحة الوصل المذهلة إلى قاعة تيرا الحديثة وساحة منطقة التنقل – استضف فعاليات لا تُنسى.',
    'benefits.support.title': 'دعم شامل',
    'benefits.support.desc': 'خدمات شاملة تشمل الأمن والتراخيص وخدمات الطعام والشراب والتنسيق اللوجستي لفعاليتك.',
    'benefits.tracking.title': 'تتبع شفاف',
    'benefits.tracking.desc': 'راقب حالة حجزك في الوقت الفعلي من خلال "حجوزاتي" – من التقديم إلى الموافقة النهائية.',
    
    // How it works
    'how.title': 'كيف يعمل',
    'how.step1.title': 'استكشف الأماكن',
    'how.step1.desc': 'تصفح مجموعتنا من الأماكن العالمية واعثر على المساحة المثالية لفعاليتك.',
    'how.step2.title': 'قدم الطلب',
    'how.step2.desc': 'أكمل نموذج الحجز مع تفاصيل ومتطلبات فعاليتك.',
    'how.step3.title': 'تتبع الموافقات',
    'how.step3.desc': 'راقب حالة طلبك واحصل على التأكيد بمجرد الموافقة.',
    
    // Footer
    'footer.faqs': 'الأسئلة الشائعة والإرشادات',
    'footer.contact': 'اتصل بالدعم',
    'footer.website': 'إكسبو سيتي دبي',
    'footer.rights': '© 2025 إكسبو سيتي دبي. جميع الحقوق محفوظة.',
    
    // Common
    'common.loginRequired': 'يتطلب تسجيل الدخول',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
