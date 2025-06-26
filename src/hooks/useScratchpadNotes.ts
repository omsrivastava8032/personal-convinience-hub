import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { toast } from 'sonner';

export const useScratchpadNotes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch notes when user changes
  useEffect(() => {
    if (user) {
      fetchNotes();
    } else {
      // Clear any localStorage data when signed out
      localStorage.removeItem('scratchpad_notes');
      setNotes('');
      setLoading(false);
    }
  }, [user]);

  const fetchNotes = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('scratchpad_notes')
        .select('content')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching scratchpad notes:', error);
        toast.error('Failed to load notes');
        return;
      }

      setNotes(data?.content || '');
    } catch (error) {
      console.error('Error fetching scratchpad notes:', error);
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const saveNotes = async (newNotes: string) => {
    if (!user) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from('scratchpad_notes')
        .upsert({
          user_id: user.id,
          content: newNotes,
        });

      if (error) {
        console.error('Error saving scratchpad notes:', error);
        toast.error('Failed to save notes');
        return;
      }

      setNotes(newNotes);
      toast.success('Notes saved');
    } catch (error) {
      console.error('Error saving scratchpad notes:', error);
      toast.error('Failed to save notes');
    } finally {
      setSaving(false);
    }
  };

  return {
    notes,
    loading,
    saving,
    saveNotes,
  };
};
