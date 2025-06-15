
import React from 'react';
import WelcomeBanner from '@/components/WelcomeBanner';
import TodaysSnapshot from '@/components/TodaysSnapshot';
import Scratchpad from '@/components/Scratchpad';
import CountdownTimer from '@/components/CountdownTimer';
import HoverCardFan from '@/components/HoverCardFan';
import { useAuth } from '@/providers/AuthProvider';

const HomePage: React.FC = () => {
  const { session } = useAuth();
  
  return (
    <div className="space-y-12">
      <WelcomeBanner />
      
      <div className="w-full max-w-4xl mx-auto">
        <CountdownTimer />
      </div>

      {/* Quick Access - New Hover Card Fan */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Quick Access</h2>
        <HoverCardFan />
      </section>

      <TodaysSnapshot />
      
      {/* Scratchpad - Full Width Rectangular Section */}
      <section className="w-full">
        <div className="rounded-2xl bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-md border border-border/50 p-8">
          <Scratchpad />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
