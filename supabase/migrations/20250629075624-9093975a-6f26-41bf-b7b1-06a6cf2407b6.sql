
-- Create table for electronic archive system
CREATE TABLE IF NOT EXISTS public.electronic_archives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  storage_path TEXT NOT NULL,
  document_category TEXT,
  tags TEXT[],
  metadata JSONB,
  extracted_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  project_id INTEGER REFERENCES public."Projet"(id),
  archived_by TEXT,
  status TEXT DEFAULT 'active'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_electronic_archives_project_id ON public.electronic_archives(project_id);
CREATE INDEX IF NOT EXISTS idx_electronic_archives_category ON public.electronic_archives(document_category);
CREATE INDEX IF NOT EXISTS idx_electronic_archives_created_at ON public.electronic_archives(created_at);
CREATE INDEX IF NOT EXISTS idx_electronic_archives_tags ON public.electronic_archives USING GIN(tags);

-- Enable Row Level Security
ALTER TABLE public.electronic_archives ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (you can modify these later for user-specific access)
CREATE POLICY "Allow public read access to archives" 
ON public.electronic_archives 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to archives" 
ON public.electronic_archives 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update to archives" 
ON public.electronic_archives 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete from archives" 
ON public.electronic_archives 
FOR DELETE 
USING (true);

-- Create storage bucket for electronic archives
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'electronic-archives', 
  'electronic-archives', 
  true, 
  52428800, -- 50MB limit
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for electronic archives bucket
CREATE POLICY "Allow public uploads to electronic archives bucket" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'electronic-archives');

CREATE POLICY "Allow public downloads from electronic archives bucket" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'electronic-archives');

CREATE POLICY "Allow public updates to electronic archives bucket" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'electronic-archives');

CREATE POLICY "Allow public deletes from electronic archives bucket" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'electronic-archives');
