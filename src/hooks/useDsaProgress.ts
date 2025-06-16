
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface DsaProgress {
  problem_id: string;
  completed: boolean;
  starred: boolean;
  notes: string;
  completed_date: string | null;
}

export const useDsaProgress = () => {
  const queryClient = useQueryClient();

  // Fetch user's DSA progress
  const { data: progressData = [], isLoading } = useQuery({
    queryKey: ['dsa-progress'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_dsa_progress')
        .select('*');

      if (error) {
        console.error('Error fetching DSA progress:', error);
        return [];
      }

      return data || [];
    },
  });

  // Update progress mutation
  const updateProgressMutation = useMutation({
    mutationFn: async ({ problemId, updates }: { problemId: string; updates: Partial<DsaProgress> }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('user_dsa_progress')
        .upsert({
          user_id: user.id,
          problem_id: problemId,
          ...updates,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dsa-progress'] });
    },
  });

  const getProgress = (problemId: string) => {
    return progressData.find(p => p.problem_id === problemId);
  };

  const updateProgress = (problemId: string, updates: Partial<DsaProgress>) => {
    updateProgressMutation.mutate({ problemId, updates });
  };

  return {
    progressData,
    isLoading,
    getProgress,
    updateProgress,
  };
};
