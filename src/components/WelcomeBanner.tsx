
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
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-background/80 backdrop-blur-md border border-primary/30 p-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1),transparent_70%)]" />
      
      <div className="relative flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
        {session ? (
          <AvatarUpdater />
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
            <Avatar className="relative w-32 h-32 lg:w-40 lg:h-40 border-4 border-primary/30 shadow-2xl">
              <AvatarImage src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop" alt="A beautiful mountain landscape" />
              <AvatarFallback>
                <UserCircle className="w-full h-full text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
          </div>
        )}
        
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              Welcome,
            </span>
            <br />
            <span className="text-foreground">I'm {name}!</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {bio}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
