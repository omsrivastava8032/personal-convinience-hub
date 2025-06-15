
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle } from 'lucide-react';
import AvatarUpdater from './AvatarUpdater';
import { useAuth } from '@/providers/AuthProvider';

const WelcomeBanner: React.FC = () => {
  const { session, profile } = useAuth();

  const defaultName = "OM Srivastava";
  const defaultBio = "Passionate developer building things for the web. This hub is my personal corner of the internet to stay organized and track my progress.";
  
  const name = profile?.full_name || defaultName;
  const bio = profile?.bio || defaultBio;

  return (
    <section className="bg-card p-8 rounded-xl shadow-lg flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8 border animate-fade-in">
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
