
-- Create table to store Google Calendar API integration details
CREATE TABLE public.google_calendar_integrations (
  user_id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL,
  refresh_token TEXT, -- refresh token is not always provided, but crucial for long-term access
  expires_at TIMESTAMPTZ NOT NULL,
  scope TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add a trigger to automatically update the 'updated_at' timestamp
CREATE TRIGGER handle_updated_at_google_calendar
  BEFORE UPDATE ON public.google_calendar_integrations
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- Enable Row Level Security to protect user data
ALTER TABLE public.google_calendar_integrations ENABLE ROW LEVEL SECURITY;

-- Create policies to ensure users can only access their own integration details
CREATE POLICY "Users can view their own calendar integration."
  ON public.google_calendar_integrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own calendar integration."
  ON public.google_calendar_integrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own calendar integration."
  ON public.google_calendar_integrations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own calendar integration."
  ON public.google_calendar_integrations FOR DELETE
  USING (auth.uid() = user_id);
