
import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Home, Briefcase, BookOpen, MessageSquare, FileText } from 'lucide-react'; // Added FileText for Resume
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Projects', path: '/projects', icon: Briefcase },
  { name: 'Blog', path: '/blog', icon: BookOpen },
  { name: 'Learning', path: '/learning', icon: FileText }, // Changed icon for Learning
  { name: 'Resume & Contact', path: '/resume', icon: MessageSquare },
];

const Navbar: React.FC = () => {
  return (
    <nav className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
            <Code2 size={28} />
            <span className="font-semibold text-xl">Portfolio Hub</span>
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {navItems.map((item) => (
              <Button key={item.name} variant="ghost" asChild>
                <Link to={item.path} className="flex items-center space-x-1.5 px-2 py-1 sm:px-3 sm:py-2 text-sm font-medium text-muted-foreground hover:text-primary">
                  <item.icon size={18} className="hidden sm:inline-block" />
                  <span>{item.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
