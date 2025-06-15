
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

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

  console.log('=== AUTH PROVIDER DEBUG ===');
  console.log('AuthProvider - session exists:', !!session);
  console.log('AuthProvider - user exists:', !!user);
  console.log('AuthProvider - loading:', loading);

  const getProfileData = React.useCallback(async (currentUser: User) => {
    console.log('AuthProvider - fetching profile for user:', currentUser.id);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`full_name, bio, avatar_url`)
        .eq('id', currentUser.id)
        .maybeSingle();

      if (error) {
        console.error('AuthProvider - error fetching profile:', error);
        toast.error(`Error fetching profile: ${error.message}`);
        setProfile(null);
        setAvatarUrl(null);
        return; // Stop execution for this function
      }
      if (data) {
        console.log('AuthProvider - profile data fetched:', data);
        setProfile(data);
        setAvatarUrl(getAvatarPublicUrl(data.avatar_url));
      } else {
        console.log('AuthProvider - no profile data found');
        setProfile(null);
        setAvatarUrl(null);
      }
    } catch (error) {
      console.error('AuthProvider - CATCH BLOCK error fetching profile:', error);
      if (error instanceof Error) {
        toast.error(`A problem occurred loading your profile: ${error.message}`);
      }
      setProfile(null);
      setAvatarUrl(null);
    }
  }, []);

  useEffect(() => {
    console.log('AuthProvider - setting up auth listener');
    setLoading(true);
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      console.log('AuthProvider - auth state changed:', _event, !!newSession);
      setSession(newSession);
      const newUser = newSession?.user ?? null;
      setUser(newUser);
      
      if (newUser) {
        console.log('AuthProvider - user detected, fetching profile');
        getProfileData(newUser);

        // Handle Google Calendar Token storage
        if (_event === "SIGNED_IN" && newSession?.provider_token) {
           console.log('AuthProvider - saving Google Calendar integration');
           setTimeout(async () => {
                const integrationData = {
                  user_id: newUser.id,
                  access_token: newSession.provider_token,
                  refresh_token: newSession.provider_refresh_token,
                  expires_at: newSession.expires_at ? new Date(newSession.expires_at * 1000).toISOString() : new Date(Date.now() + 3600 * 1000).toISOString(),
                  scope: 'https://www.googleapis.com/auth/calendar.events'
                };

                const { error } = await supabase
                    .from('google_calendar_integrations')
                    .upsert(integrationData, { onConflict: 'user_id' });

                if (error) {
                    console.error("Error saving Google Calendar integration:", error);
                    toast.error(`Failed to link Google Calendar: ${error.message}`);
                } else {
                    console.log("Google Calendar integration saved successfully");
                    toast.success("Google Calendar linked successfully!");
                }
            }, 0);
        }
      } else {
        console.log('AuthProvider - user logged out, clearing profile');
        setProfile(null);
        setAvatarUrl(null);
      }
      setLoading(false);
    });

    return () => {
      console.log('AuthProvider - cleaning up auth listener');
      subscription.unsubscribe();
    };
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
