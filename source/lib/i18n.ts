/**
 * i18n Multi-language Support
 * Simple lightweight i18n implementation
 */
import { useState, useEffect } from 'react';

export type Language = 'en' | 'zh' | 'es' | 'fr' | 'de';

export interface Translations {
  [key: string]: string | Translations;
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      blog: 'Blog',
      contact: 'Contact',
    },
    contact: {
      title: 'INITIATE CONNECTION',
      subtitle: "Have a project in mind? Let's build something revolutionary together.",
      sendMessage: 'Send Message',
      description: 'Transmitting to secure channel - Response within 24 hours',
      name: 'Your Name',
      email: 'Your Email',
      message: 'Your Message',
      submit: 'Transmit Message',
      submitting: 'Transmitting...',
      success: 'Message sent successfully!',
      error: 'Transmission failed. Please try again.',
      rateLimit: 'Please wait {seconds} seconds before submitting again.',
    },
    crypto: {
      loading: '...',
    },
  },
  zh: {
    nav: {
      home: '首页',
      about: '关于',
      skills: '技能',
      projects: '项目',
      blog: '博客',
      contact: '联系',
    },
    contact: {
      title: '建立联系',
      subtitle: '有项目想法？让我们一起构建革命性的东西。',
      sendMessage: '发送消息',
      description: '传输到安全通道 - 24小时内回复',
      name: '您的姓名',
      email: '您的邮箱',
      message: '您的消息',
      submit: '发送消息',
      submitting: '发送中...',
      success: '消息发送成功！',
      error: '传输失败。请重试。',
      rateLimit: '请等待 {seconds} 秒后再提交。',
    },
    crypto: {
      loading: '...',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      skills: 'Habilidades',
      projects: 'Proyectos',
      blog: 'Blog',
      contact: 'Contacto',
    },
    contact: {
      title: 'INICIAR CONEXIÓN',
      subtitle: '¿Tienes un proyecto en mente? Construyamos algo revolucionario juntos.',
      sendMessage: 'Enviar Mensaje',
      description: 'Transmitiendo a canal seguro - Respuesta en 24 horas',
      name: 'Tu Nombre',
      email: 'Tu Email',
      message: 'Tu Mensaje',
      submit: 'Transmitir Mensaje',
      submitting: 'Transmitiendo...',
      success: '¡Mensaje enviado con éxito!',
      error: 'Transmisión fallida. Por favor intenta de nuevo.',
      rateLimit: 'Por favor espera {seconds} segundos antes de enviar de nuevo.',
    },
    crypto: {
      loading: '...',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      skills: 'Compétences',
      projects: 'Projets',
      blog: 'Blog',
      contact: 'Contact',
    },
    contact: {
      title: 'INITIER LA CONNEXION',
      subtitle: 'Vous avez un projet en tête ? Construisons quelque chose de révolutionnaire ensemble.',
      sendMessage: 'Envoyer un Message',
      description: 'Transmission vers canal sécurisé - Réponse sous 24 heures',
      name: 'Votre Nom',
      email: 'Votre Email',
      message: 'Votre Message',
      submit: 'Transmettre le Message',
      submitting: 'Transmission...',
      success: 'Message envoyé avec succès !',
      error: 'Transmission échouée. Veuillez réessayer.',
      rateLimit: 'Veuillez attendre {seconds} secondes avant de soumettre à nouveau.',
    },
    crypto: {
      loading: '...',
    },
  },
  de: {
    nav: {
      home: 'Startseite',
      about: 'Über',
      skills: 'Fähigkeiten',
      projects: 'Projekte',
      blog: 'Blog',
      contact: 'Kontakt',
    },
    contact: {
      title: 'VERBINDUNG INITIIEREN',
      subtitle: 'Haben Sie ein Projekt im Kopf? Lassen Sie uns gemeinsam etwas Revolutionäres bauen.',
      sendMessage: 'Nachricht Senden',
      description: 'Übertragung an sicheren Kanal - Antwort innerhalb von 24 Stunden',
      name: 'Ihr Name',
      email: 'Ihre E-Mail',
      message: 'Ihre Nachricht',
      submit: 'Nachricht Übertragen',
      submitting: 'Übertragung...',
      success: 'Nachricht erfolgreich gesendet!',
      error: 'Übertragung fehlgeschlagen. Bitte versuchen Sie es erneut.',
      rateLimit: 'Bitte warten Sie {seconds} Sekunden, bevor Sie erneut senden.',
    },
    crypto: {
      loading: '...',
    },
  },
};

class I18n {
  private currentLanguage: Language = 'en';

  constructor() {
    // Detect language from browser or localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    const browserLanguage = navigator.language.split('-')[0] as Language;
    
    if (savedLanguage && translations[savedLanguage]) {
      this.currentLanguage = savedLanguage;
    } else if (translations[browserLanguage as Language]) {
      this.currentLanguage = browserLanguage as Language;
    }
  }

  setLanguage(lang: Language) {
    if (translations[lang]) {
      this.currentLanguage = lang;
      localStorage.setItem('language', lang);
      // Trigger custom event for components to react
      window.dispatchEvent(new CustomEvent('languagechange', { detail: lang }));
    }
  }

  getLanguage(): Language {
    return this.currentLanguage;
  }

  t(key: string, params?: Record<string, string | number>): string {
    const keys = key.split('.');
    let value: any = translations[this.currentLanguage];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if translation not found
          }
        }
        break;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Replace parameters
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }

    return value;
  }
}

export const i18n = new I18n();

// React hook for i18n
export function useTranslation() {
  const [language, setLanguageState] = useState<Language>(i18n.getLanguage());

  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent<Language>) => {
      setLanguageState(e.detail);
    };

    window.addEventListener('languagechange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange as EventListener);
    };
  }, []);

  return {
    t: i18n.t.bind(i18n),
    language,
    setLanguage: (lang: Language) => {
      i18n.setLanguage(lang);
      setLanguageState(lang);
    },
  };
}

// Import React hooks
import { useState, useEffect } from 'react';

