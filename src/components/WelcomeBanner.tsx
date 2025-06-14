
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle } from 'lucide-react';

interface WelcomeBannerProps {
  name: string;
  bio: string;
  avatarSrc?: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ name, bio, avatarSrc }) => {
  return (
    <section className="bg-card p-8 rounded-lg shadow-md flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
      <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-primary">
        <AvatarImage src={avatarSrc} alt={name} />
        <AvatarFallback>
          <UserCircle className="w-full h-full text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-4xl sm:text-5xl font-bold text-primary">Welcome, I'm {name}!</h1>
        <p className="mt-2 text-lg text-muted-foreground">{bio}</p>
      </div>
    </section>
  );
};

export default WelcomeBanner;
