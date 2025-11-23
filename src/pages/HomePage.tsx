
import React from 'react';
import WelcomeBanner from '@/components/WelcomeBanner';
import TodaysSnapshot from '@/components/TodaysSnapshot';
import { Github, Linkedin, GraduationCap, ListChecks } from 'lucide-react';
import Scratchpad from '@/components/Scratchpad';
import CountdownTimer from '@/components/CountdownTimer';

const quickLinks = [
  { title: "Striver's DSA Sheet", href: "/learning#dsa", icon: ListChecks, description: "Track my DSA progress on the sheet." },
  { title: "GitHub Profile", href: "https://github.com/omsri8032", icon: Github, description: "View my code & contributions." },
  { title: "LinkedIn Profile", href: "https://www.linkedin.com/in/om-srivastava-4a169a249", icon: Linkedin, description: "Connect with me professionally." },
  { title: "VTOP Login", href: "https://vtop.vit.ac.in/vtop/login", icon: GraduationCap, description: "Access the VIT student portal." },
];

const HomePage: React.FC = () => {

  return (
    <div className="space-y-12">
      <WelcomeBanner />

      <div className="w-full max-w-4xl mx-auto">
        <CountdownTimer />
      </div>

      {/* Quick Links - Rectangular Grid Layout */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            const isExternal = link.href.startsWith('http');

            const content = (
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm border border-primary/20 p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <span className="text-primary font-bold text-lg">{index + 1}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{link.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{link.description}</p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );

            if (isExternal) {
              return (
                <a key={link.title} href={link.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              );
            }

            return (
              <a key={link.title} href={link.href}>
                {content}
              </a>
            );
          })}
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
