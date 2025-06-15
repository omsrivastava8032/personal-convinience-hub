
import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 text-center mt-16">
      <div className="container mx-auto px-4 rounded-xl bg-card/60 backdrop-blur-md border border-card-foreground/20 shadow-lg py-6">
        <div className="flex justify-center space-x-6 mb-4 text-card-foreground">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Twitter size={20} />
          </a>
        </div>
        <p className="text-sm text-card-foreground">&copy; {new Date().getFullYear()} OM Srivastava. All rights reserved.</p>
        <p className="text-xs mt-2 text-card-foreground/80">Designed & Built by You with Lovable</p>
      </div>
    </footer>
  );
};

export default Footer;
