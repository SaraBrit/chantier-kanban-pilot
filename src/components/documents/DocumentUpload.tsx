
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText } from 'lucide-react';
import { useDocuments } from '@/hooks/useDocuments';
import { useImportedTasks } from '@/hooks/useImportedTasks';
import { parseExcelTasks } from '@/lib/excelParser';
import { toast } from 'sonner';

interface DocumentUploadProps {
  projectId?: string;
}

export const DocumentUpload = ({ projectId }: DocumentUploadProps = {}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docType, setDocType] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const { uploadDocument } = useDocuments();
  const { addImportedTasks } = useImportedTasks();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Veuillez sélectionner un fichier');
      return;
    }

    setUploading(true);
    try {
      // Handle Excel task import
      if (docType === 'plan_excel' && (selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls'))) {
        const tasks = await parseExcelTasks(selectedFile);
        if (projectId) {
          addImportedTasks(projectId, tasks);
          toast.success(`${tasks.length} tâches importées pour le projet`);
        } else {
          toast.success(`${tasks.length} tâches importées`);
        }
      }
      
      // Always upload the document to storage
      await uploadDocument(selectedFile, docType || undefined);
      toast.success('Document téléchargé avec succès');
      setSelectedFile(null);
      setDocType('');
      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Télécharger un document
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="file-input">Fichier</Label>
          <Input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xlsx,.xls"
          />
        </div>

        <div>
          <Label htmlFor="doc-type">Type de document</Label>
          <Select value={docType} onValueChange={setDocType}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner le type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="facture">Facture</SelectItem>
              <SelectItem value="contrat">Contrat</SelectItem>
              <SelectItem value="rapport">Rapport</SelectItem>
              <SelectItem value="plan">Plan</SelectItem>
              <SelectItem value="plan_excel">Plan Excel (Tâches)</SelectItem>
              <SelectItem value="photo">Photo</SelectItem>
              <SelectItem value="autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedFile && (
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <FileText className="h-4 w-4" />
            <span className="text-sm">{selectedFile.name}</span>
            <span className="text-xs text-gray-500">
              ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </span>
          </div>
        )}

        <Button 
          onClick={handleUpload} 
          disabled={!selectedFile || uploading}
          className="w-full"
        >
          {uploading ? 'Téléchargement...' : 'Télécharger'}
        </Button>
      </CardContent>
    </Card>
  );
};
