
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Trash2, Search, Filter } from 'lucide-react';
import { useElectronicArchives, ElectronicArchive } from '@/hooks/useElectronicArchives';
import { useToast } from '@/hooks/use-toast';

interface ArchiveListProps {
  onSelectArchive?: (archive: ElectronicArchive) => void;
}

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

export const ArchiveList = ({ onSelectArchive }: ArchiveListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchResults, setSearchResults] = useState<ElectronicArchive[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const { archives, loading, deleteArchive, getFileUrl, searchArchives } = useElectronicArchives();
  const { toast } = useToast();

  const displayedArchives = searchResults.length > 0 || searchQuery || selectedCategory !== 'all' ? searchResults : archives;

  const handleSearch = async () => {
    if (!searchQuery && selectedCategory === 'all') {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const categoryFilter = selectedCategory === 'all' ? undefined : selectedCategory;
      const results = await searchArchives(searchQuery, categoryFilter);
      setSearchResults(results);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la recherche",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSearchResults([]);
  };

  const handleDelete = async (archive: ElectronicArchive) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      try {
        await deleteArchive(archive.id, archive.storage_path);
        toast({
          title: "Succès",
          description: "Document supprimé avec succès"
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression",
          variant: "destructive"
        });
      }
    }
  };

  const handleDownload = (archive: ElectronicArchive) => {
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

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Chargement des archives...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Archive Électronique
        </CardTitle>
        
        {/* Search and Filter */}
        <div className="flex gap-2 mt-4">
          <div className="flex-1">
            <Input
              placeholder="Rechercher dans les archives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {documentCategories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSearch} disabled={isSearching}>
            <Search className="h-4 w-4" />
          </Button>
          {(searchQuery || selectedCategory !== 'all') && (
            <Button variant="outline" onClick={handleClearSearch}>
              <Filter className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {displayedArchives.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchQuery || selectedCategory !== 'all' ? 'Aucun résultat trouvé' : 'Aucun document archivé'}
          </div>
        ) : (
          <div className="space-y-4">
            {displayedArchives.map((archive) => (
              <div
                key={archive.id}
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelectArchive?.(archive)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {archive.original_name}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>{formatFileSize(archive.file_size)}</span>
                      <span>{new Date(archive.created_at).toLocaleDateString('fr-FR')}</span>
                      {archive.project_id && (
                        <span>Projet #{archive.project_id}</span>
                      )}
                    </div>
                    {archive.document_category && (
                      <Badge variant="secondary" className="mt-2">
                        {archive.document_category}
                      </Badge>
                    )}
                    {archive.tags && archive.tags.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {archive.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(archive);
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(archive);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
