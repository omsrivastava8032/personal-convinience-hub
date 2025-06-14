
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

const Scratchpad: React.FC = () => {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('scratchpad-notes');
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    localStorage.setItem('scratchpad-notes', e.target.value);
  };

  return (
    <section>
        <h2 className="text-3xl font-semibold mb-6 text-center sm:text-left">Scratchpad</h2>
        <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Quick Notes
            </CardTitle>
            <CardDescription>Jot down anything that's on your mind. It's saved automatically to your browser.</CardDescription>
        </CardHeader>
        <CardContent>
            <Textarea
            placeholder="Type your notes here..."
            value={notes}
            onChange={handleChange}
            className="min-h-[200px] text-base"
            />
        </CardContent>
        </Card>
    </section>
  );
};

export default Scratchpad;
