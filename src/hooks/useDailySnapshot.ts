
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { toast } from 'sonner';

export const useDailySnapshot = () => {
  const { user } = useAuth();
  const [currentFocus, setCurrentFocus] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch today's snapshot when user changes
  useEffect(() => {
    if (user) {
      fetchTodaysSnapshot();
    } else {
      setCurrentFocus('');
      setLoading(false);
    }
  }, [user]);

  const fetchTodaysSnapshot = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('daily_snapshots')
        .select('current_focus')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (error) {
        console.error('Error fetching daily snapshot:', error);
        toast.error('Failed to load focus');
        return;
      }

      setCurrentFocus(data?.current_focus || '');
    } catch (error) {
      console.error('Error fetching daily snapshot:', error);
      toast.error('Failed to load focus');
    } finally {
      setLoading(false);
    }
  };

  const saveFocus = async (newFocus: string) => {
    if (!user) return;

    try {
      setSaving(true);
      const today = new Date().toISOString().split('T')[0];
      
      const { error } = await supabase
        .from('daily_snapshots')
        .upsert({
          user_id: user.id,
          date: today,
          current_focus: newFocus,
        }, {
          onConflict: 'user_id,date'
        });

      if (error) {
        console.error('Error saving daily snapshot:', error);
        toast.error('Failed to save focus');
        return;
      }

      setCurrentFocus(newFocus);
    } catch (error) {
      console.error('Error saving daily snapshot:', error);
      toast.error('Failed to save focus');
    } finally {
      setSaving(false);
    }
  };

  return {
    currentFocus,
    loading,
    saving,
    saveFocus,
  };
};
