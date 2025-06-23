
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/providers/AuthProvider';

interface DailyStats {
  date: string;
  problems_solved: number;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria_type: string;
  criteria_value: number;
}

interface UserBadge extends Badge {
  awarded_at: string;
}

export const useStreakTracker = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch user's streak data from profile
  const { data: profileData } = useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('current_streak, best_streak, freeze_tokens, last_solve_date')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch daily stats for heatmap
  const { data: dailyStats = [] } = useQuery({
    queryKey: ['daily-stats', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      
      const { data, error } = await supabase
        .from('daily_stats')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', oneYearAgo.toISOString().split('T')[0])
        .order('date', { ascending: true });

      if (error) throw error;
      return data as DailyStats[];
    },
    enabled: !!user,
  });

  // Fetch user's badges
  const { data: userBadges = [] } = useQuery({
    queryKey: ['user-badges', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_badges')
        .select(`
          awarded_at,
          badges (
            id,
            name,
            description,
            icon,
            criteria_type,
            criteria_value
          )
        `)
        .eq('user_id', user.id)
        .order('awarded_at', { ascending: false });

      if (error) throw error;
      return data.map(item => ({
        ...item.badges,
        awarded_at: item.awarded_at
      })) as UserBadge[];
    },
    enabled: !!user,
  });

  // Mark problem as done mutation
  const markProblemDoneMutation = useMutation({
    mutationFn: async ({ problemId, difficulty }: { problemId: string; difficulty: 'Easy' | 'Medium' | 'Hard' }) => {
      if (!user) throw new Error('User not authenticated');

      // Call the edge function to handle the complete workflow
      const { data, error } = await supabase.functions.invoke('mark-problem-done', {
        body: { problemId, difficulty }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['user-profile', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['daily-stats', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['user-badges', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['dsa-progress', user?.id] });
    },
  });

  const markProblemDone = (problemId: string, difficulty: 'Easy' | 'Medium' | 'Hard') => {
    markProblemDoneMutation.mutate({ problemId, difficulty });
  };

  return {
    currentStreak: profileData?.current_streak || 0,
    bestStreak: profileData?.best_streak || 0,
    freezeTokens: profileData?.freeze_tokens || 0,
    lastSolveDate: profileData?.last_solve_date,
    dailyStats,
    userBadges,
    markProblemDone,
    isLoading: markProblemDoneMutation.isPending,
  };
};
