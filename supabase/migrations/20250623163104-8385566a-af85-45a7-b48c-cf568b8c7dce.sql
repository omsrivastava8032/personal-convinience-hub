
-- Add streak and badge tracking columns to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS current_streak integer DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS best_streak integer DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS freeze_tokens integer DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_solve_date date;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS notification_time time DEFAULT '21:00:00';

-- Create badges table
CREATE TABLE IF NOT EXISTS public.badges (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  criteria_type text NOT NULL, -- 'streak', 'total_solves', 'medium_solves', etc.
  criteria_value integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create user_badges table for tracking awarded badges
CREATE TABLE IF NOT EXISTS public.user_badges (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id uuid NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  awarded_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Create daily_stats table for heatmap data
CREATE TABLE IF NOT EXISTS public.daily_stats (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  problems_solved integer DEFAULT 0,
  easy_solved integer DEFAULT 0,
  medium_solved integer DEFAULT 0,
  hard_solved integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Add RLS policies for badges table
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Badges are viewable by everyone" ON public.badges FOR SELECT USING (true);

-- Add RLS policies for user_badges table
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own badges" ON public.user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own badges" ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Add RLS policies for daily_stats table
ALTER TABLE public.daily_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own daily stats" ON public.daily_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own daily stats" ON public.daily_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own daily stats" ON public.daily_stats FOR UPDATE USING (auth.uid() = user_id);

-- Insert default badges
INSERT INTO public.badges (name, description, icon, criteria_type, criteria_value) VALUES
('First Steps', 'Complete your first problem', '🚀', 'total_solves', 1),
('Week Warrior', 'Maintain a 7-day streak', '🔥', 'streak', 7),
('Consistency King', 'Maintain a 14-day streak', '👑', 'streak', 14),
('Month Master', 'Maintain a 30-day streak', '🏆', 'streak', 30),
('Medium Mastery', 'Solve 30 medium problems', '⚡', 'medium_solves', 30),
('Century Club', 'Solve 100 total problems', '💯', 'total_solves', 100),
('Problem Crusher', 'Solve 250 total problems', '🦾', 'total_solves', 250),
('DSA Legend', 'Solve 500 total problems', '👑', 'total_solves', 500)
ON CONFLICT DO NOTHING;

-- Add trigger for updated_at on daily_stats
CREATE TRIGGER handle_updated_at_daily_stats
  BEFORE UPDATE ON public.daily_stats
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Add trigger for updated_at on profiles (if not exists)
DROP TRIGGER IF EXISTS handle_updated_at_profiles ON public.profiles;
CREATE TRIGGER handle_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
