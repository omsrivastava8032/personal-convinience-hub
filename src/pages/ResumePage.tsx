
import React from 'react';
import ContactForm from '@/components/ContactForm';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';
import Auth from '@/components/Auth';
import ResumeVault from '@/components/ResumeVault';

const ResumePage: React.FC = () => {
  return (
    <div className="space-y-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">Resume & Contact</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Manage your professional documents and get in touch with me directly.</p>
      </header>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center">Resume/CV Vault</h2>
        <Auth>
          <ResumeVault />
        </Auth>
      </section>

      <section className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Send Me a Message</h2>
        <ContactForm />
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Connect With Me</h2>
        <div className="flex justify-center space-x-6">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-accent">
            <Linkedin size={28} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-accent">
            <Twitter size={28} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-accent">
            <Github size={28} />
          </a>
          <a href="mailto:your.email@example.com" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-accent">
            <Mail size={28} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default ResumePage;
