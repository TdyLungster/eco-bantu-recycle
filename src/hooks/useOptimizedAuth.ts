
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export const useOptimizedAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const initializeAuth = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!initialized) {
      initializeAuth();
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [initialized, initializeAuth]);

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    signOut,
    isAuthenticated: !!user
  };
};
