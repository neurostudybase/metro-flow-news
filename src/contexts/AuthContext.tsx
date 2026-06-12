import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

export type UserRole = 'super_admin' | 'city_editor' | 'journalist' | 'moderator' | 'ad_manager' | 'seo_manager' | 'user';

interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  role: UserRole;
  roles: UserRole[];
}

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const buildAppUser = async (supaUser: SupabaseUser): Promise<AppUser> => {
  let roles: UserRole[] = [];
  let fullName = (supaUser.user_metadata?.full_name as string) || supaUser.email || '';

  try {
    const { data: roleRows } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', supaUser.id);
    roles = (roleRows ?? []).map(r => r.role as UserRole);
  } catch { /* ignore */ }

  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', supaUser.id)
      .maybeSingle();
    if (profile?.full_name) fullName = profile.full_name;
  } catch { /* ignore */ }

  const primaryRole: UserRole = roles.includes('super_admin') ? 'super_admin'
    : roles[0] ?? 'user';

  return {
    id: supaUser.id,
    name: fullName,
    email: supaUser.email ?? '',
    phone: (supaUser.user_metadata?.phone as string) ?? '',
    city: 'Тюмень',
    role: primaryRole,
    roles,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener FIRST (sync only inside)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        // defer async profile/roles fetch
        setTimeout(() => {
          buildAppUser(newSession.user).then(setUser);
        }, 0);
      } else {
        setUser(null);
      }
    });

    // Then existing session
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (data.session?.user) {
        setUser(await buildAppUser(data.session.user));
      }
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const login: AuthContextType['login'] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  };

  const register: AuthContextType['register'] = async (name, email, password) => {
    const redirectUrl = `${window.location.origin}/cabinet`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl, data: { full_name: name } },
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const isSuperAdmin = user?.roles.includes('super_admin') ?? false;
  const adminRoles: UserRole[] = ['super_admin', 'city_editor', 'journalist', 'moderator', 'ad_manager', 'seo_manager'];
  const isAdmin = (user?.roles ?? []).some(r => adminRoles.includes(r));

  return (
    <AuthContext.Provider value={{
      user, session, loading,
      isAuthenticated: !!user,
      isAdmin, isSuperAdmin,
      login, register, logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
