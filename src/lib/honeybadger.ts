
import Honeybadger from '@honeybadger-io/js';

// Initialize Honeybadger for error tracking
export const initHoneybadger = () => {
  Honeybadger.configure({
    apiKey: import.meta.env.VITE_HONEYBADGER_API_KEY || '',
    environment: import.meta.env.MODE || 'development',
    reportData: true,
    enableUncaught: true,
    enableUnhandledRejection: true,
  });
};

// Custom error notification
export const notifyError = (error: Error, context?: any) => {
  console.error('Honeybadger error:', error, context);
  
  if (import.meta.env.MODE === 'production') {
    Honeybadger.notify(error, {
      context: context
    });
  }
};

// Add breadcrumb for debugging
export const addBreadcrumb = (message: string, metadata?: any) => {
  Honeybadger.addBreadcrumb(message, {
    metadata: metadata,
    category: 'custom'
  });
};
