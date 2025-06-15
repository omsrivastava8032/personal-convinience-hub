
import React from 'react';
import WelcomeBanner from '@/components/WelcomeBanner';
import QuickLinkCard from '@/components/QuickLinkCard';
import TodaysSnapshot from '@/components/TodaysSnapshot';
import { Github, Linkedin, GraduationCap, ListChecks } from 'lucide-react';
import Scratchpad from '@/components/Scratchpad';
import CountdownTimer from '@/components/CountdownTimer';
import { useAuth } from '@/providers/AuthProvider';

const quickLinks = [
  { title: "Striver's DSA Sheet", href: "/learning#dsa", icon: ListChecks, description: "Track my DSA progress on the sheet." },
  { title: "GitHub Profile", href: "https://github.com/omsri8032", icon: Github, description: "View my code & contributions." },
  { title: "LinkedIn Profile", href: "https://www.linkedin.com/in/om-srivastava-4a169a249", icon: Linkedin, description: "Connect with me professionally." },
  { title: "VTOP Login", href: "https://vtop.vit.ac.in/vtop/login", icon: GraduationCap, description: "Access the VIT student portal." },
];

const HomePage: React.FC = () => {
  const { session } = useAuth();
  
  return (
    <div className="space-y-12">
      <WelcomeBanner />
      
      <div className="w-full max-w-4xl mx-auto">
        <CountdownTimer />
      </div>

      {/* Quick Links - Fan-out on Hover */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Quick Access</h2>
        <div className="relative h-96 flex items-center justify-center">
          <div className="group relative w-80 h-48">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              const isExternal = link.href.startsWith('http');
              
              // Calculate fan-out positions - spread them out more and make them simultaneous
              const angle = (index - 1.5) * 25; // Increased angle for better spread
              const distance = 180; // Distance from center
              const hoverTransformX = Math.sin((angle * Math.PI) / 180) * distance;
              const hoverTransformY = Math.cos((angle * Math.PI) / 180) * distance * -1;
              
              const content = (
                <div 
                  className="absolute top-1/2 left-1/2 w-72 h-40 transition-all duration-700 ease-out cursor-pointer"
                  style={{
                    transform: 'translateX(-50%) translateY(-50%)',
                    zIndex: 10 - index
                  }}
                >
                  <div 
                    className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm border border-primary/20 p-6 shadow-lg transition-all duration-700 ease-out group-hover:shadow-2xl"
                    style={{
                      transform: `translateX(${hoverTransformX}px) translateY(${hoverTransformY}px) rotate(${angle * 0.3}deg) scale(1.05)`,
                      opacity: 1,
                      transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Icon className="h-7 w-7 text-primary transition-transform duration-300 hover:scale-110" />
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center transition-colors duration-300 hover:bg-primary/20">
                        <span className="text-primary font-bold text-sm">{index + 1}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground transition-colors duration-300 hover:text-primary">{link.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{link.description}</p>
                  </div>
                </div>
              );

              if (isExternal) {
                return (
                  <a key={link.title} href={link.href} target="_blank" rel="noopener noreferrer" className="contents">
                    {content}
                  </a>
                );
              }

              return (
                <a key={link.title} href={link.href} className="contents">
                  {content}
                </a>
              );
            })}
          </div>
        </div>
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
