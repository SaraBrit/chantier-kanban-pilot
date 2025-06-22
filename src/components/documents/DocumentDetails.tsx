
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, User, HardDrive } from 'lucide-react';
import { Document } from '@/hooks/useDocuments';

interface DocumentDetailsProps {
  document: Document;
}

export const DocumentDetails = ({ document }: DocumentDetailsProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDocTypeColor = (type?: string) => {
    switch (type) {
      case 'facture': return 'bg-green-100 text-green-800';
      case 'contrat': return 'bg-blue-100 text-blue-800';
      case 'rapport': return 'bg-purple-100 text-purple-800';
      case 'plan': return 'bg-orange-100 text-orange-800';
      case 'photo': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Détails du document
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Informations générales</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Nom:</span>
                <span className="text-sm">{document.file_name}</span>
              </div>
              
              {document.doc_type && (
                <div className="flex items-center gap-2">
                  <Badge className={getDocTypeColor(document.doc_type)}>
                    {document.doc_type}
                  </Badge>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Téléchargé le:</span>
                <span className="text-sm">
                  {new Date(document.uploaded_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Type:</span>
                <span className="text-sm">{document.file_type}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Données extraites</h4>
            {document.extracted_data ? (
              <div className="space-y-2">
                {document.extracted_data.size && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Taille:</span>
                    <span className="text-sm">{formatFileSize(document.extracted_data.size)}</span>
                  </div>
                )}
                
                {document.extracted_data.lastModified && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Dernière modification:</span>
                    <span className="text-sm">
                      {new Date(document.extracted_data.lastModified).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                )}

                {document.extracted_data.type && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">MIME Type:</span>
                    <span className="text-sm">{document.extracted_data.type}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Aucune donnée extraite disponible</p>
            )}
          </div>
        </div>

        {document.extracted_data && Object.keys(document.extracted_data).length > 3 && (
          <div>
            <h4 className="font-semibold mb-2">Données complètes</h4>
            <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto max-h-40">
              {JSON.stringify(document.extracted_data, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
