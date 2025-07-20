import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useImportedTasks } from '@/hooks/useImportedTasks';
import { parseExcelTasks } from '@/lib/excelParser';
import { toast } from 'sonner';

interface ProjectExcelImportProps {
  projectId: string;
  projectName: string;
}

export const ProjectExcelImport = ({ projectId, projectName }: ProjectExcelImportProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { addImportedTasks } = useImportedTasks();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      toast.error('Veuillez sélectionner un fichier Excel');
      return;
    }

    if (!selectedFile.name.endsWith('.xlsx') && !selectedFile.name.endsWith('.xls')) {
      toast.error('Veuillez sélectionner un fichier Excel (.xlsx ou .xls)');
      return;
    }

    setUploading(true);
    try {
      const tasks = await parseExcelTasks(selectedFile);
      addImportedTasks(projectId, tasks);
      toast.success(`${tasks.length} tâches importées pour ${projectName}`);
      
      // Reset form
      setSelectedFile(null);
      setIsOpen(false);
      
      // Reset file input
      const fileInput = document.getElementById(`excel-input-${projectId}`) as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erreur lors de l\'import');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Importer Excel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Importer tâches depuis Excel
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor={`excel-input-${projectId}`}>Fichier Excel</Label>
            <Input
              id={`excel-input-${projectId}`}
              type="file"
              onChange={handleFileChange}
              accept=".xlsx,.xls"
            />
            <p className="text-xs text-gray-500 mt-1">
              Format attendu: colonnes avec titres comme "Tache", "Description", "Statut", "Priorité", "Assignee", "Date fin", "Progres"
            </p>
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

          <div className="flex gap-2">
            <Button 
              onClick={handleImport} 
              disabled={!selectedFile || uploading}
              className="flex-1"
            >
              {uploading ? 'Import...' : 'Importer tâches'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={uploading}
            >
              Annuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};