
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { ArchiveUpload } from '@/components/archive/ArchiveUpload';
import { ArchiveList } from '@/components/archive/ArchiveList';
import { ArchiveDetails } from '@/components/archive/ArchiveDetails';
import { ElectronicArchive } from '@/hooks/useElectronicArchives';

const ElectronicArchivePage = () => {
  const [selectedArchive, setSelectedArchive] = useState<ElectronicArchive | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentView="documents" 
        projectName="Archive Électronique"
      />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Système d'Archive Électronique
            </h1>
            <p className="text-gray-600">
              Gérez, stockez et retrouvez vos documents avec un système d'archivage intelligent
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Colonne gauche - Upload et liste */}
            <div className="space-y-6">
              <ArchiveUpload />
              <ArchiveList onSelectArchive={setSelectedArchive} />
            </div>

            {/* Colonne droite - Détails */}
            <div>
              {selectedArchive ? (
                <ArchiveDetails archive={selectedArchive} />
              ) : (
                <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                  <p className="text-gray-500">
                    Sélectionnez un document pour voir ses détails
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectronicArchivePage;
