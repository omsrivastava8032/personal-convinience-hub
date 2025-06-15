import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Home, Briefcase, MessageSquare, FileText, LogIn, LogOut, Calendar, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from '@/providers/AuthProvider';

const navItemsConfig = [
  { name: 'Home', path: '/', icon: Home, private: false },
  { name: 'Projects', path: '/projects', icon: Briefcase, private: false },
  { name: 'Learning', path: '/learning', icon: FileText, private: false },
  { name: 'Calendar', path: '/calendar', icon: Calendar, private: true },
  { name: 'Resume & Contact', path: '/resume', icon: MessageSquare, private: false },
];

const Navbar: React.FC = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };
  
  // A more robust check for a valid, active session.
  const isLoggedIn = !!(session?.user && session?.access_token);
  
  const visibleNavItems = navItemsConfig.filter(item => !item.private || isLoggedIn);

  return (
    <nav className="bg-background/90 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
            <Code2 size={28} />
            <span className="font-semibold text-xl hidden md:inline whitespace-nowrap">Personal Convenience Hub</span>
            <span className="font-semibold text-xl md:hidden">P.C. Hub</span>
          </Link>
          <div className="flex items-center space-x-1">
            {visibleNavItems.map((item) => (
              <Button key={item.name} variant="ghost" asChild>
                <Link to={item.path} className="flex items-center space-x-1.5 px-2 py-1 sm:px-3 sm:py-2 text-sm font-medium text-muted-foreground hover:text-primary">
                  <item.icon size={18} className="hidden sm:inline-block" />
                  <span>{item.name}</span>
                </Link>
              </Button>
            ))}
            {isLoggedIn ? (
              <Button variant="ghost" onClick={handleLogout} className="flex items-center space-x-1.5 px-2 py-1 sm:px-3 sm:py-2 text-sm font-medium text-muted-foreground hover:text-primary">
                <LogOut size={18} className="hidden sm:inline-block" />
                <span>Logout</span>
              </Button>
            ) : (
              <Button variant="ghost" asChild>
                <Link to="/auth" className="flex items-center space-x-1.5 px-2 py-1 sm:px-3 sm:py-2 text-sm font-medium text-muted-foreground hover:text-primary">
                  <LogIn size={18} className="hidden sm:inline-block" />
                  <span>Login</span>
                </Link>
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
