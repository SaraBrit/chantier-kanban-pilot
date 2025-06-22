
-- Create the documents storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true);

-- Create storage policies to allow public access for document operations
CREATE POLICY "Allow public uploads to documents bucket" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Allow public downloads from documents bucket" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'documents');

CREATE POLICY "Allow public updates to documents bucket" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'documents');

CREATE POLICY "Allow public deletes from documents bucket" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'documents');
