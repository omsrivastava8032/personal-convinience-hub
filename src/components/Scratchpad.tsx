
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Loader2 } from 'lucide-react';
import { useScratchpadNotes } from '@/hooks/useScratchpadNotes';
import { useAuth } from '@/providers/AuthProvider';

const Scratchpad: React.FC = () => {
  const { user } = useAuth();
  const { notes, loading, saving, saveNotes } = useScratchpadNotes();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    saveNotes(newNotes);
  };

  if (!user) {
    return (
      <section className="animate-fade-in">
        <h2 className="text-3xl font-semibold mb-6 text-center sm:text-left">Scratchpad</h2>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              Quick Notes
            </CardTitle>
            <CardDescription>Please log in to access your personal scratchpad.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
              Login required to save notes
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="animate-fade-in">
      <h2 className="text-3xl font-semibold mb-6 text-center sm:text-left">Scratchpad</h2>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Quick Notes
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardTitle>
          <CardDescription>
            Jot down anything that's on your mind. Your notes are saved automatically to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="min-h-[200px] flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <Textarea
              placeholder="Type your notes here..."
              value={notes}
              onChange={handleChange}
              className="min-h-[200px] text-base"
              disabled={saving}
            />
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default Scratchpad;
