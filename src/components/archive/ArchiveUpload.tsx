
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';
import { useElectronicArchives } from '@/hooks/useElectronicArchives';
import { useToast } from '@/hooks/use-toast';

const documentCategories = [
  'Contrat',
  'Facture',
  'Plan',
  'Rapport',
  'Correspondance',
  'Photo',
  'Certificat',
  'Autre'
];

export const ArchiveUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [projectId, setProjectId] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const { uploadToArchive } = useElectronicArchives();
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier",
        variant: "destructive"
      });
      return;
    }

    try {
      setUploading(true);
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      const numericProjectId = projectId ? parseInt(projectId) : undefined;

      await uploadToArchive(selectedFile, category, numericProjectId, tagsArray);
      
      toast({
        title: "Succès",
        description: "Document archivé avec succès"
      });

      // Reset form
      setSelectedFile(null);
      setCategory('');
      setTags('');
      setProjectId('');
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de l'archivage",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Archiver un document
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="file">Fichier</Label>
          <Input
            id="file"
            type="file"
            onChange={handleFileSelect}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt"
          />
          {selectedFile && (
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <span>{selectedFile.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFile(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="category">Catégorie</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {documentCategories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="project">ID Projet (optionnel)</Label>
          <Input
            id="project"
            type="number"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            placeholder="Numéro du projet"
          />
        </div>

        <div>
          <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="urgent, client, contrat..."
          />
        </div>

        <Button 
          onClick={handleUpload} 
          disabled={!selectedFile || uploading}
          className="w-full"
        >
          {uploading ? 'Archivage en cours...' : 'Archiver le document'}
        </Button>
      </CardContent>
    </Card>
  );
};
