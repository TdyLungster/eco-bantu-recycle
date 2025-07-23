
// Secure configuration management
export const config = {
  supabase: {
    url: "https://bjprnsvwezvlckjuihkc.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqcHJuc3Z3ZXp2bGNranVpaGtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMjc2MDMsImV4cCI6MjA2NjYwMzYwM30.U2PpCaiClDMggDZsIusBjBWOznVx92TSMLVrK2F8QCM"
  },
  monitoring: {
    sentryDsn: process.env.REACT_APP_SENTRY_DSN || '',
    honeybadgerApiKey: process.env.REACT_APP_HONEYBADGER_API_KEY || ''
  },
  app: {
    environment: process.env.NODE_ENV || 'development',
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
