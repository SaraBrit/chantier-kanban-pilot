
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ElectronicArchive {
  id: string;
  file_name: string;
  original_name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
  document_category?: string;
  tags?: string[];
  metadata?: any;
  extracted_text?: string;
  created_at: string;
  updated_at: string;
  project_id?: number;
  archived_by?: string;
  status: string;
}

export const useElectronicArchives = () => {
  const [archives, setArchives] = useState<ElectronicArchive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArchives = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching archives...');
      const { data, error } = await supabase
        .from('electronic_archives')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Fetched archives:', data?.length || 0, 'records');
      console.log('Sample records:', data?.slice(0, 2));
      setArchives(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement';
      console.error('Archive fetch error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const uploadToArchive = async (
    file: File, 
    category?: string, 
    projectId?: number,
    tags?: string[]
  ) => {
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `archives/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('electronic-archives')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create metadata
      const metadata = {
        size: file.size,
        lastModified: file.lastModified,
        type: file.type,
        uploadDate: new Date().toISOString()
      };

      // Save archive metadata to database
      const { data, error: dbError } = await supabase
        .from('electronic_archives')
        .insert({
          file_name: fileName,
          original_name: file.name,
          file_type: file.type,
          file_size: file.size,
          storage_path: filePath,
          document_category: category,
          tags: tags || [],
          metadata: metadata,
          project_id: projectId,
          status: 'active'
        })
        .select()
        .single();

      if (dbError) throw dbError;

      await fetchArchives();
      return data;
    } catch (err) {
      throw new Error(`Erreur lors de l'archivage: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
    }
  };

  const deleteArchive = async (id: string, storagePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('electronic-archives')
        .remove([storagePath]);

      if (storageError) throw storageError;

      // Mark as deleted in database (soft delete)
      const { error: dbError } = await supabase
        .from('electronic_archives')
        .update({ status: 'deleted' })
        .eq('id', id);

      if (dbError) throw dbError;

      await fetchArchives();
    } catch (err) {
      throw new Error(`Erreur lors de la suppression: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
    }
  };

  const getFileUrl = (storagePath: string) => {
    const { data } = supabase.storage
      .from('electronic-archives')
      .getPublicUrl(storagePath);
    return data.publicUrl;
  };

  const searchArchives = async (query: string, category?: string) => {
    try {
      let queryBuilder = supabase
        .from('electronic_archives')
        .select('*')
        .eq('status', 'active');

      if (category) {
        queryBuilder = queryBuilder.eq('document_category', category);
      }

      if (query) {
        queryBuilder = queryBuilder.or(`original_name.ilike.%${query}%,extracted_text.ilike.%${query}%,tags.cs.{${query}}`);
      }

      const { data, error } = await queryBuilder.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      throw new Error(`Erreur lors de la recherche: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
    }
  };

  useEffect(() => {
    fetchArchives();
  }, []);

  return {
    archives,
    loading,
    error,
    uploadToArchive,
    deleteArchive,
    getFileUrl,
    searchArchives,
    refetch: fetchArchives
  };
};
