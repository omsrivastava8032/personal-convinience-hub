
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/providers/AuthProvider';

interface DsaProgress {
  topic_id: string;
  is_completed: boolean;
}

export const useDsaProgress = () => {
  const queryClient = useQueryClient();
  const { user, session } = useAuth();

  // Fetch user's DSA progress - only when user is authenticated
  const { data: progressData = [], isLoading } = useQuery({
    queryKey: ['dsa-progress', user?.id],
    queryFn: async () => {
      if (!user || !session) {
        console.log('No authenticated user, returning empty progress');
        return [];
      }

      console.log('Fetching DSA progress for user:', user.id);
      const { data, error } = await supabase
        .from('user_dsa_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching DSA progress:', error);
        throw error;
      }

      console.log('Fetched DSA progress:', data);
      return data || [];
    },
    enabled: !!user && !!session, // Only run query when user is authenticated
  });

  // Update progress mutation
  const updateProgressMutation = useMutation({
    mutationFn: async ({ problemId, updates }: { problemId: string; updates: Partial<DsaProgress> }) => {
      if (!user || !session) {
        throw new Error('User not authenticated');
      }

      console.log('Updating progress for problem:', problemId, 'updates:', updates);

      const { error } = await supabase
        .from('user_dsa_progress')
        .upsert({
          user_id: user.id,
          topic_id: problemId,
          is_completed: updates.is_completed || false,
        });

      if (error) {
        console.error('Error updating progress:', error);
        throw error;
      }

      console.log('Progress updated successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dsa-progress', user?.id] });
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
  });

  const getProgress = (problemId: string) => {
    return progressData.find(p => p.topic_id === problemId);
  };

  const updateProgress = (problemId: string, updates: Partial<DsaProgress>) => {
    if (!user || !session) {
      console.error('Cannot update progress: user not authenticated');
      return;
    }
    updateProgressMutation.mutate({ problemId, updates });
  };

  return {
    progressData,
    isLoading,
    getProgress,
    updateProgress,
    isAuthenticated: !!user && !!session,
  };
};
