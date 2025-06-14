import { useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

export default function Auth({ children }: { children?: ReactNode }) {
  const { session, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (session && !children) {
      navigate('/learning');
    }
  }, [session, children, navigate]);

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
    }
  };

  const handleSignup = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}`,
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

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/learning`,
        scopes: 'https://www.googleapis.com/auth/calendar.readonly',
      },
    });
    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
    // No need to setLoading(false) on success, as the page will redirect.
  };

  const isFormSubmitting = loading || authLoading;

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
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
            <Button className="w-full" type="submit" disabled={isFormSubmitting || !email || !password}>
              {isFormSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
            <Button className="w-full" variant="secondary" type="button" onClick={handleSignup} disabled={isFormSubmitting || !email || !password}>
              {isFormSubmitting ? 'Signing Up...' : 'Sign Up'}
            </Button>
            <div className="relative w-full my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button className="w-full" variant="outline" type="button" onClick={handleGoogleLogin} disabled={isFormSubmitting}>
              {isFormSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Sign in with Google
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }

  return null;
}
