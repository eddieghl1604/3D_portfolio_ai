/**
 * Sentry Error Tracking Configuration
 * Initialize Sentry for production error monitoring
 */

// Import Sentry using ES6 import syntax
import * as Sentry from '@sentry/react';

export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  const environment = import.meta.env.MODE || 'development';

  if (!dsn) {
    console.warn('Sentry DSN not configured. Add VITE_SENTRY_DSN to your .env file');
    return;
  }

  try {
    Sentry.init({
      dsn,
      environment,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      // Performance Monitoring
      tracesSampleRate: environment === 'production' ? 0.1 : 1.0,
      // Session Replay
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      // Filter out sensitive data
      beforeSend(event: any, hint: any) {
        // Remove sensitive information
        if (event.request) {
          // Remove email addresses from URLs
          if (event.request.url) {
            event.request.url = event.request.url.replace(
              /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
              '[EMAIL_REDACTED]'
            );
          }
        }
        return event;
      },
    });

    console.log('✅ Sentry initialized successfully for', environment);
  } catch (error) {
    console.error('Failed to initialize Sentry:', error);
  }
}

// Export Sentry functions
export const captureException = (error: unknown, options?: any) => {
  try {
    Sentry.captureException(error, options);
  } catch (err) {
    console.error('Sentry captureException failed:', err);
  }
};

export const captureMessage = (message: string, options?: any) => {
  try {
    Sentry.captureMessage(message, options);
  } catch (err) {
    console.error('Sentry captureMessage failed:', err);
  }
};
