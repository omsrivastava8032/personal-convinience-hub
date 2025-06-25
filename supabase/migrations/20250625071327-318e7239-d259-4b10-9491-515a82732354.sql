
-- Create table for user scratchpad notes
CREATE TABLE public.scratchpad_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create table for user daily snapshots
CREATE TABLE public.daily_snapshots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  current_focus TEXT DEFAULT '',
  goals TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Enable RLS
ALTER TABLE public.scratchpad_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_snapshots ENABLE ROW LEVEL SECURITY;

-- RLS policies for scratchpad_notes
CREATE POLICY "Users can view their own scratchpad notes"
  ON public.scratchpad_notes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scratchpad notes"
  ON public.scratchpad_notes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own scratchpad notes"
  ON public.scratchpad_notes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scratchpad notes"
  ON public.scratchpad_notes FOR DELETE
  USING (auth.uid() = user_id);

-- RLS policies for daily_snapshots
CREATE POLICY "Users can view their own daily snapshots"
  ON public.daily_snapshots FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own daily snapshots"
  ON public.daily_snapshots FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily snapshots"
  ON public.daily_snapshots FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own daily snapshots"
  ON public.daily_snapshots FOR DELETE
  USING (auth.uid() = user_id);

-- Add updated_at triggers
CREATE TRIGGER handle_updated_at_scratchpad_notes
  BEFORE UPDATE ON public.scratchpad_notes
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_daily_snapshots
  BEFORE UPDATE ON public.daily_snapshots
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();
