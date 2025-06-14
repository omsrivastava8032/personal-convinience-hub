
-- Create a new storage bucket for resumes, restricted to authenticated users
-- It allows only PDFs up to 5MB.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('resumes', 'resumes', false, 5242880, '{"application/pdf"}');

-- Create a table to store resume metadata
CREATE TABLE public.resumes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  storage_path TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add trigger to update 'updated_at' column
CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON public.resumes
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- Enable RLS for the resumes table
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Create policies for the resumes table to allow users to manage their own resumes
CREATE POLICY "Users can view their own resumes."
  ON public.resumes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own resumes."
  ON public.resumes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resumes."
  ON public.resumes FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for storage.objects to allow users to manage their own files in the 'resumes' bucket
-- The file path must be in the format: {user_id}/{file_name}
CREATE POLICY "Users can view their own resume files."
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resumes' AND auth.uid() = (storage.foldername(name))[1]::uuid);

CREATE POLICY "Users can upload their own resume files."
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'resumes' AND auth.uid() = (storage.foldername(name))[1]::uuid);

CREATE POLICY "Users can delete their own resume files."
  ON storage.objects FOR DELETE
  USING (bucket_id = 'resumes' AND auth.uid() = (storage.foldername(name))[1]::uuid);
