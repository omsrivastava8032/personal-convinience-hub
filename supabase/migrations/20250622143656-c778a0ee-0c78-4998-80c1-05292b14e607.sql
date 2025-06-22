
-- First, drop the foreign key constraint
ALTER TABLE user_dsa_progress DROP CONSTRAINT IF EXISTS user_dsa_progress_topic_id_fkey;

-- Now update the topic_id column to text type
ALTER TABLE user_dsa_progress ALTER COLUMN topic_id TYPE text;

-- Update the unique constraint to work with the new data type
ALTER TABLE user_dsa_progress DROP CONSTRAINT IF EXISTS user_dsa_progress_user_id_topic_id_key;
ALTER TABLE user_dsa_progress ADD CONSTRAINT user_dsa_progress_user_id_topic_id_key UNIQUE (user_id, topic_id);

-- Add RLS policies for the table
ALTER TABLE user_dsa_progress ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own progress
CREATE POLICY "Users can view their own DSA progress" 
  ON user_dsa_progress 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own progress
CREATE POLICY "Users can create their own DSA progress" 
  ON user_dsa_progress 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own progress
CREATE POLICY "Users can update their own DSA progress" 
  ON user_dsa_progress 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own progress
CREATE POLICY "Users can delete their own DSA progress" 
  ON user_dsa_progress 
  FOR DELETE 
  USING (auth.uid() = user_id);
