import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom'; // No longer needed here

type Profile = {
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  avatarUrl: string | null;
  updateProfileAvatarInContext: (avatarPath: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getAvatarPublicUrl(path: string | null): string | null {
  if (!path) return null;
  const { data } = supabase.storage.from('avatars').getPublicUrl(path);
  return data.publicUrl;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate(); // Removed to centralize navigation logic in components

  const getProfileData = React.useCallback(async (currentUser: User) => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, bio, avatar_url`)
        .eq('id', currentUser.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setProfile(data);
        setAvatarUrl(getAvatarPublicUrl(data.avatar_url));
      } else {
        setProfile(null);
        setAvatarUrl(null);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error fetching profile: ${error.message}`);
      }
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      const newUser = newSession?.user ?? null;
      setUser(newUser);
      
      if (newUser) {
        getProfileData(newUser);
      } else {
        setProfile(null);
        setAvatarUrl(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [getProfileData]);
  
  const updateProfileAvatarInContext = (avatarPath: string) => {
      setAvatarUrl(getAvatarPublicUrl(avatarPath));
      if (profile) {
          setProfile({ ...profile, avatar_url: avatarPath });
      }
  };

  const value = {
    session,
    user,
    profile,
    loading,
    avatarUrl,
    updateProfileAvatarInContext,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
