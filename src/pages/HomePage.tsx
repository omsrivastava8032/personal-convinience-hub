
import React from 'react';
import WelcomeBanner from '@/components/WelcomeBanner';
import QuickLinkCard from '@/components/QuickLinkCard';
import TodaysSnapshot from '@/components/TodaysSnapshot';
import { Github, FileText, BookOpen, ListChecks } from 'lucide-react';

const quickLinks = [
  { title: "GitHub Profile", href: "#", icon: Github, description: "View my code & contributions." },
  { title: "Download Resume", href: "#", icon: FileText, description: "Get my latest CV." },
  { title: "Blog Posts", href: "/blog", icon: BookOpen, description: "Read my thoughts & articles." },
  { title: "DSA Sheet", href: "/learning#dsa", icon: ListChecks, description: "Track my DSA progress." },
];

const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      <WelcomeBanner name="Your Name" bio="Passionate developer creating impactful solutions. Exploring new technologies and building cool projects." />
      
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center sm:text-left">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map(link => (
            <QuickLinkCard key={link.title} title={link.title} href={link.href} icon={link.icon} description={link.description} />
          ))}
        </div>
      </section>

      <TodaysSnapshot />
    </div>
  );
};

export default HomePage;
