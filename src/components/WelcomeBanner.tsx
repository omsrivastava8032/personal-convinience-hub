
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle } from 'lucide-react';
import { toast } from 'sonner';
import AvatarUpdater from './AvatarUpdater';

const WelcomeBanner: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<{ full_name: string | null; bio: string | null } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (session) {
      getProfile();
    } else {
      setProfile(null);
    }
  }, [session]);

  async function getProfile() {
    if (!session?.user) return;
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, bio`)
        .eq('id', session.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      setProfile(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error fetching profile: ${error.message}`);
      }
    }
  }

  const defaultName = "OM Srivastava";
  const defaultBio = "Passionate developer building things for the web. This hub is my personal corner of the internet to stay organized and track my progress.";
  
  const name = profile?.full_name || defaultName;
  const bio = profile?.bio || defaultBio;

  return (
    <section className="bg-card p-8 rounded-xl shadow-lg flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8 border">
      {session ? (
        <AvatarUpdater />
      ) : (
        <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-primary/20">
          <AvatarImage src={undefined} alt={name} />
          <AvatarFallback>
            <UserCircle className="w-full h-full text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      )}
      <div>
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400">Welcome, I'm {name}!</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{bio || ''}</p>
      </div>
    </section>
  );
};

export default WelcomeBanner;
