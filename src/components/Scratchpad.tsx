
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Loader2 } from 'lucide-react';
import { useScratchpadNotes } from '@/hooks/useScratchpadNotes';
import { useAuth } from '@/providers/AuthProvider';

const Scratchpad: React.FC = () => {
  const { user } = useAuth();
  const { notes, loading, saving, saveNotes } = useScratchpadNotes();
  const [localNotes, setLocalNotes] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  console.log('Scratchpad render - notes:', notes, 'localNotes:', localNotes, 'loading:', loading, 'saving:', saving);

  // Sync local notes with fetched notes only once when data is loaded
  React.useEffect(() => {
    if (!loading && !isInitialized) {
      console.log('Initializing localNotes with:', notes);
      setLocalNotes(notes);
      setIsInitialized(true);
    }
  }, [notes, loading, isInitialized]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    console.log('handleChange called with:', newNotes);
    setLocalNotes(newNotes);
  };

  const handleBlur = () => {
    console.log('handleBlur called - localNotes:', localNotes, 'original notes:', notes);
    // Save when user stops typing (on blur)
    if (localNotes !== notes) {
      console.log('Saving notes...');
      saveNotes(localNotes);
    }
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
            Jot down anything that's on your mind. Your notes are saved automatically when you finish typing.
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
              value={localNotes}
              onChange={handleChange}
              onBlur={handleBlur}
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
