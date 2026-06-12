import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const ADMIN_EMAIL = 'dludlulungile08@gmail.com';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'ok' | 'denied'>('loading');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setStatus(user?.email === ADMIN_EMAIL ? 'ok' : 'denied');
    });
  }, []);

  if (status === 'loading') return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (status === 'denied') return <Navigate to="/" replace />;
  return <>{children}</>;
}
