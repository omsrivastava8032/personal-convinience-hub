
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

const SectionTitle: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <h2 className="text-3xl font-bold tracking-tight mb-6 text-center sm:text-left">{children}</h2>
);

const HomePage: React.FC = () => {
  const { session } = useAuth();
  
  return (
    <div className="space-y-16">
      <WelcomeBanner />
      <CountdownTimer />

      <section>
        <SectionTitle>Quick Links</SectionTitle>
        <div className="relative max-w-md mx-auto lg:max-w-lg">
          <div className="relative h-[400px] perspective-1000">
            {quickLinks.map((link, index) => (
              <div
                key={link.title}
                className="absolute inset-0 animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "backwards"
                }}
              >
                <QuickLinkCard 
                  title={link.title} 
                  href={link.href} 
                  icon={link.icon} 
                  description={link.description}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <TodaysSnapshot />
      <Scratchpad />
    </div>
  );
};

export default HomePage;
