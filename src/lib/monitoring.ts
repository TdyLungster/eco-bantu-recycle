
import * as Sentry from '@sentry/react';

// Initialize Sentry for error monitoring
export const initSentry = () => {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN || '',
    environment: process.env.NODE_ENV || 'development',
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay()
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
  const transaction = Sentry.startTransaction({
    name,
    op: 'custom'
  });
  
  try {
    const result = fn();
    if (result instanceof Promise) {
      return result.finally(() => transaction.finish());
    }
    transaction.finish();
    return result;
  } catch (error) {
    transaction.setStatus('internal_error');
    transaction.finish();
    throw error;
  }
};
