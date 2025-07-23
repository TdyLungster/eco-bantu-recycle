
import * as Sentry from '@sentry/react';

// Initialize Sentry for error monitoring
export const initSentry = () => {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN || '',
    environment: process.env.NODE_ENV || 'development',
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
};

// Custom error logging
export const logError = (error: Error, context?: any) => {
  console.error('Error logged:', error, context);
  
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, {
      contexts: {
        additional: context
      }
    });
  }
};

// Performance monitoring
export const trackPerformance = (name: string, fn: () => void | Promise<void>) => {
  return Sentry.startSpan({
    name,
    op: 'custom'
  }, () => {
    try {
      const result = fn();
      if (result instanceof Promise) {
        return result.catch((error) => {
          logError(error, { performance: name });
          throw error;
        });
      }
      return result;
    } catch (error) {
      logError(error as Error, { performance: name });
      throw error;
    }
  });
};
