
// Secure configuration management
export const config = {
  supabase: {
    url: "https://rwfycdbfohzhvlwjjsno.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3ZnljZGJmb2h6aHZsd2pqc25vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1ODQ0OTcsImV4cCI6MjA3OTE2MDQ5N30.S-r9aZqz1ZLXaGFDm-cb7zLDm0-flbaQRraHkOccACw"
  },
  monitoring: {
    sentryDsn: import.meta.env.VITE_SENTRY_DSN || '',
    honeybadgerApiKey: import.meta.env.VITE_HONEYBADGER_API_KEY || ''
  },
  app: {
    environment: import.meta.env.MODE || 'development',
    version: '1.0.0'
  }
};

// Security headers for production
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};
