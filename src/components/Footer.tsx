
import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent py-8 text-center text-muted-foreground mt-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6 mb-4">
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
        <p className="text-sm">&copy; {new Date().getFullYear()} OM Srivastava. All rights reserved.</p>
        <p className="text-xs mt-2">Designed & Built by You with Lovable</p>
      </div>
    </footer>
  );
};

export default Footer;
