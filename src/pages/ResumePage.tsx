
import React from 'react';
import ContactForm from '@/components/ContactForm';
import { Button } from '@/components/ui/button';
import { Download, Linkedin, Twitter, Github, Mail } from 'lucide-react';

const ResumePage: React.FC = () => {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary">Resume & Contact</h1>
        <p className="mt-2 text-lg text-muted-foreground">Get in touch or download my latest resume.</p>
      </header>

      <section className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Download My Resume</h2>
        <Button size="lg" asChild>
          {/* Replace '#' with the actual link to your resume PDF */}
          <a href="#" download="YourName_Resume.pdf"> 
            <Download className="mr-2 h-5 w-5" /> Download PDF
          </a>
        </Button>
        <p className="mt-3 text-sm text-muted-foreground">
          (Placeholder: Click to download a sample PDF)
        </p>
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
