
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, Calendar, FolderOpen, Tag, User, Database } from 'lucide-react';
import { ElectronicArchive } from '@/hooks/useElectronicArchives';
import { useElectronicArchives } from '@/hooks/useElectronicArchives';

interface ArchiveDetailsProps {
  archive: ElectronicArchive;
}

export const ArchiveDetails = ({ archive }: ArchiveDetailsProps) => {
  const { getFileUrl } = useElectronicArchives();

  const handleDownload = () => {
    const url = getFileUrl(archive.storage_path);
    window.open(url, '_blank');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Détails du document
          </CardTitle>
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="font-semibold mb-3">Informations générales</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Nom du fichier:</span>
              <span className="font-medium">{archive.original_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span>{archive.file_type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taille:</span>
              <span>{formatFileSize(archive.file_size)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Statut:</span>
              <Badge variant={archive.status === 'active' ? 'default' : 'secondary'}>
                {archive.status === 'active' ? 'Actif' : archive.status}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Dates */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Dates
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Créé le:</span>
              <span>{new Date(archive.created_at).toLocaleString('fr-FR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Modifié le:</span>
              <span>{new Date(archive.updated_at).toLocaleString('fr-FR')}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Category and Project */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            Classification
          </h3>
          <div className="space-y-2">
            {archive.document_category && (
              <div className="flex justify-between">
                <span className="text-gray-600">Catégorie:</span>
                <Badge variant="secondary">{archive.document_category}</Badge>
              </div>
            )}
            {archive.project_id && (
              <div className="flex justify-between">
                <span className="text-gray-600">Projet:</span>
                <span>#{archive.project_id}</span>
              </div>
            )}
            {archive.archived_by && (
              <div className="flex justify-between">
                <span className="text-gray-600">Archivé par:</span>
                <span>{archive.archived_by}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {archive.tags && archive.tags.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {archive.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Metadata */}
        {archive.metadata && (
          <>
            <Separator />
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Database className="h-4 w-4" />
                Métadonnées
              </h3>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(archive.metadata, null, 2)}
                </pre>
              </div>
            </div>
          </>
        )}

        {/* Extracted Text */}
        {archive.extracted_text && (
          <>
            <Separator />
            <div>
              <h3 className="font-semibold mb-3">Texte extrait</h3>
              <div className="bg-gray-50 p-3 rounded text-sm max-h-32 overflow-y-auto">
                {archive.extracted_text}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
