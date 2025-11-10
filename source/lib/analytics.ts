// Google Analytics 4 integration
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID;

export const initAnalytics = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    console.warn('Analytics: GA_MEASUREMENT_ID not found or running on server');
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(...args: any[]) {
    window.dataLayer.push(args);
  };

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Configure GA
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });

  console.log('Analytics initialized');
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

export const trackPageView = (path: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
};

// Common event tracking functions
export const trackContactFormSubmit = (success: boolean) => {
  trackEvent('contact_form_submit', {
    success,
    event_category: 'engagement',
    event_label: success ? 'success' : 'failure',
  });
};

export const trackProjectView = (projectName: string) => {
  trackEvent('project_view', {
    project_name: projectName,
    event_category: 'engagement',
  });
};

export const trackResumeDownload = () => {
  trackEvent('resume_download', {
    event_category: 'engagement',
  });
};

export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', {
    platform,
    event_category: 'outbound',
  });
};

