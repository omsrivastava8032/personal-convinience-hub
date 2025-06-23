
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MarkProblemDoneRequest {
  problemId: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Get user from auth header
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Invalid auth token');
    }

    const { problemId, difficulty }: MarkProblemDoneRequest = await req.json();
    
    console.log(`Processing problem completion for user ${user.id}: ${problemId} (${difficulty})`);

    const today = new Date().toISOString().split('T')[0];

    // 1. Mark the problem as done in user_dsa_progress
    await supabase
      .from('user_dsa_progress')
      .upsert({
        user_id: user.id,
        topic_id: problemId,
        is_completed: true,
      }, {
        onConflict: 'user_id,topic_id'
      });

    // 2. Update daily stats
    const difficultyField = `${difficulty.toLowerCase()}_solved`;
    
    const { data: existingStats } = await supabase
      .from('daily_stats')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();

    if (existingStats) {
      // Update existing record
      await supabase
        .from('daily_stats')
        .update({
          problems_solved: existingStats.problems_solved + 1,
          [difficultyField]: (existingStats[difficultyField] || 0) + 1,
        })
        .eq('user_id', user.id)
        .eq('date', today);
    } else {
      // Create new record
      await supabase
        .from('daily_stats')
        .insert({
          user_id: user.id,
          date: today,
          problems_solved: 1,
          [difficultyField]: 1,
        });
    }

    // 3. Calculate and update streaks
    await calculateStreaks(user.id);

    // 4. Check and award badges
    await checkAndAwardBadges(user.id);

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error in mark-problem-done:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

async function calculateStreaks(userId: string) {
  console.log(`Calculating streaks for user ${userId}`);
  
  // Get user's daily stats ordered by date
  const { data: dailyStats } = await supabase
    .from('daily_stats')
    .select('date, problems_solved')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (!dailyStats || dailyStats.length === 0) {
    return;
  }

  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 0;
  
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const yesterdayStr = new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Check if user solved today or yesterday to maintain streak
  const hasRecentActivity = dailyStats.some(stat => 
    (stat.date === todayStr || stat.date === yesterdayStr) && stat.problems_solved > 0
  );

  if (hasRecentActivity) {
    // Calculate current streak
    for (let i = 0; i < dailyStats.length; i++) {
      const stat = dailyStats[i];
      if (stat.problems_solved > 0) {
        tempStreak++;
        
        // Check if this day is consecutive
        if (i > 0) {
          const prevDate = new Date(dailyStats[i - 1].date);
          const currentDate = new Date(stat.date);
          const dayDiff = Math.abs((prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
          
          if (dayDiff > 1) {
            break; // Streak broken
          }
        }
      } else {
        break; // Streak broken
      }
    }
    currentStreak = tempStreak;
  }

  // Calculate best streak
  tempStreak = 0;
  for (const stat of dailyStats) {
    if (stat.problems_solved > 0) {
      tempStreak++;
      bestStreak = Math.max(bestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  // Award freeze tokens for every 14-day streak milestone
  const { data: currentProfile } = await supabase
    .from('profiles')
    .select('current_streak, freeze_tokens')
    .eq('id', userId)
    .single();

  let newFreezeTokens = currentProfile?.freeze_tokens || 0;
  const previousStreak = currentProfile?.current_streak || 0;
  
  // Award freeze token if crossing a 14-day milestone
  if (currentStreak >= 14 && Math.floor(currentStreak / 14) > Math.floor(previousStreak / 14)) {
    newFreezeTokens += 1;
    console.log(`Awarding freeze token for ${currentStreak}-day streak`);
  }

  // Update profile with new streak data
  await supabase
    .from('profiles')
    .update({
      current_streak: currentStreak,
      best_streak: Math.max(bestStreak, currentProfile?.best_streak || 0),
      freeze_tokens: newFreezeTokens,
      last_solve_date: todayStr,
    })
    .eq('id', userId);

  console.log(`Updated streaks: current=${currentStreak}, best=${bestStreak}, freeze_tokens=${newFreezeTokens}`);
}

async function checkAndAwardBadges(userId: string) {
  console.log(`Checking badges for user ${userId}`);

  // Get current user stats
  const { data: profile } = await supabase
    .from('profiles')
    .select('current_streak')
    .eq('id', userId)
    .single();

  const { data: totalStats } = await supabase
    .from('daily_stats')
    .select('problems_solved, medium_solved')
    .eq('user_id', userId);

  if (!totalStats) return;

  const totalSolves = totalStats.reduce((sum, stat) => sum + (stat.problems_solved || 0), 0);
  const mediumSolves = totalStats.reduce((sum, stat) => sum + (stat.medium_solved || 0), 0);
  const currentStreak = profile?.current_streak || 0;

  // Get available badges
  const { data: badges } = await supabase
    .from('badges')
    .select('*');

  // Get already awarded badges
  const { data: userBadges } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', userId);

  const awardedBadgeIds = new Set(userBadges?.map(ub => ub.badge_id) || []);

  if (!badges) return;

  // Check each badge criteria
  for (const badge of badges) {
    if (awardedBadgeIds.has(badge.id)) continue;

    let shouldAward = false;

    switch (badge.criteria_type) {
      case 'total_solves':
        shouldAward = totalSolves >= badge.criteria_value;
        break;
      case 'medium_solves':
        shouldAward = mediumSolves >= badge.criteria_value;
        break;
      case 'streak':
        shouldAward = currentStreak >= badge.criteria_value;
        break;
    }

    if (shouldAward) {
      console.log(`Awarding badge: ${badge.name} to user ${userId}`);
      await supabase
        .from('user_badges')
        .insert({
          user_id: userId,
          badge_id: badge.id,
        });
    }
  }
}

serve(handler);
