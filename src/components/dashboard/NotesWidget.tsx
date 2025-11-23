
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';

const NotesWidget: React.FC = () => {
    const [note, setNote] = useState('');

    useEffect(() => {
        const savedNote = localStorage.getItem('quick-note');
        if (savedNote) setNote(savedNote);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setNote(newValue);
        localStorage.setItem('quick-note', newValue);
    };

    return (
        <Textarea
            value={note}
            onChange={handleChange}
            placeholder="Type your notes here..."
            className="h-full resize-none bg-black/20 border-white/10 focus-visible:ring-white/20"
        />
    );
};

export default NotesWidget;
