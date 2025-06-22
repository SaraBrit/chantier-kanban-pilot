
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Document {
  id: string;
  file_name: string;
  file_type: string;
  storage_path: string;
  doc_type?: string;
  extracted_data?: any;
  uploaded_at: string;
  uploader?: string;
}

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (file: File, docType?: string) => {
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Extract basic file information
      const extractedData = {
        size: file.size,
        lastModified: file.lastModified,
        type: file.type
      };

      // Save document metadata to database
      const { data, error: dbError } = await supabase
        .from('documents')
        .insert({
          file_name: file.name,
          file_type: file.type,
          storage_path: filePath,
          doc_type: docType,
          extracted_data: extractedData
        })
        .select()
        .single();

      if (dbError) throw dbError;

      await fetchDocuments();
      return data;
    } catch (err) {
      throw new Error(`Erreur lors de l'upload: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
    }
  };

  const deleteDocument = async (id: string, storagePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([storagePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      await fetchDocuments();
    } catch (err) {
      throw new Error(`Erreur lors de la suppression: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    documents,
    loading,
    error,
    uploadDocument,
    deleteDocument,
    refetch: fetchDocuments
  };
};
