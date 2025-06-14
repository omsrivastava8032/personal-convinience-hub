
import { useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';

export default function Auth({ children }: { children?: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && !children) {
        navigate('/learning');
      }
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [children, navigate]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("Login failed:", error.message);
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success("Logged in successfully!");
      if (!children) {
        navigate('/learning');
      }
    }
  };

  const handleSignup = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/learning`,
      },
    });

    if (error) {
      console.error("Signup failed:", error.message);
      toast.error(error.message);
    } else {
      toast.success("Signup successful! Please check your email to verify your account.");
    }
    setLoading(false);
  };
  
  if (loading) {
    return null;
  }

  if (session && children) {
    return <>{children}</>;
  }
  
  if (!session) {
    return (
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Login or Sign up to {children ? "view this content" : "track your progress"}</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <Button className="w-full" type="submit" disabled={loading || !email || !password}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            <Button className="w-full" variant="secondary" type="button" onClick={handleSignup} disabled={loading || !email || !password}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }

  return null;
}
