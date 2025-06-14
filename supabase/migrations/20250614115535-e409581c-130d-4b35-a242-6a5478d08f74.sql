
-- Table to store all topics from the Striver's A2Z DSA Sheet
CREATE TABLE public.dsa_topics (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    category text NOT NULL,
    topic_name text NOT NULL,
    problem_url text,
    "order" serial NOT NULL
);

-- Allow public read access to all topics, as the list is not sensitive
ALTER TABLE public.dsa_topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to DSA topics" ON public.dsa_topics FOR SELECT USING (true);

-- Insert some sample data from the sheet to get started
INSERT INTO public.dsa_topics (category, topic_name, problem_url) VALUES
('Step 1.1: Learn the basics', 'User Input / Output', 'https://www.geeksforgeeks.org/basic-input-output-in-c/'),
('Step 1.1: Learn the basics', 'Data Types', 'https://www.geeksforgeeks.org/data-types-in-c-2/'),
('Step 1.1: Learn the basics', 'If-Else Statements', 'https://www.geeksforgeeks.org/c-if-else-statement/'),
('Step 1.2: Build-up Logical Thinking', 'Pattern 1: Rectangular Star Pattern', 'https://takeuforward.org/pattern/pattern-1-rectangular-star-pattern/'),
('Step 1.2: Build-up Logical Thinking', 'Pattern 2: Right-Angled Triangle Pattern', 'https://takeuforward.org/pattern/pattern-2-right-angled-triangle-pattern/'),
('Step 1.4: Know Basic Maths', 'Count Digits', 'https://www.geeksforgeeks.org/program-count-digits-integer-3-different-methods/'),
('Step 1.4: Know Basic Maths', 'Reverse a Number', 'https://www.geeksforgeeks.org/write-a-program-to-reverse-digits-of-a-number/');

-- Table to track user-specific progress
CREATE TABLE public.user_dsa_progress (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic_id uuid NOT NULL REFERENCES public.dsa_topics(id) ON DELETE CASCADE,
    is_completed boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT user_dsa_progress_unique UNIQUE (user_id, topic_id)
);

-- Add RLS to the progress table so users can only access their own data
ALTER TABLE public.user_dsa_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own progress"
ON public.user_dsa_progress
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
ON public.user_dsa_progress
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
ON public.user_dsa_progress
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress"
ON public.user_dsa_progress
FOR DELETE USING (auth.uid() = user_id);

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before any update on the progress table
CREATE TRIGGER on_user_dsa_progress_updated
BEFORE UPDATE ON public.user_dsa_progress
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

