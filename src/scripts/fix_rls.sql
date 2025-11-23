-- Enable RLS on tables (if not already enabled)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_dsa_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_calendar_integrations ENABLE ROW LEVEL SECURITY;

-- Policy for 'profiles': Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Policy for 'profiles': Users can update their own profile
CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Policy for 'profiles': Users can view their own profile
CREATE POLICY "Users can view their own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

-- Policy for 'resumes': Users can insert their own resumes
CREATE POLICY "Users can insert their own resumes"
ON resumes FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy for 'resumes': Users can view their own resumes
CREATE POLICY "Users can view their own resumes"
ON resumes FOR SELECT
USING (auth.uid() = user_id);

-- Policy for 'resumes': Users can delete their own resumes
CREATE POLICY "Users can delete their own resumes"
ON resumes FOR DELETE
USING (auth.uid() = user_id);

-- Policy for 'user_dsa_progress': Users can manage their own progress
CREATE POLICY "Users can manage their own progress"
ON user_dsa_progress FOR ALL
USING (auth.uid() = user_id);
