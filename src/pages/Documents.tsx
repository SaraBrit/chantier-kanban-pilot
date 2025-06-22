
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { DocumentUpload } from '@/components/documents/DocumentUpload';
import { DocumentList } from '@/components/documents/DocumentList';
import { DocumentDetails } from '@/components/documents/DocumentDetails';
import { Document } from '@/hooks/useDocuments';

const Documents = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

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
              Archive Électronique
            </h1>
            <p className="text-gray-600">
              Téléchargez, stockez et consultez vos documents avec extraction automatique des métadonnées
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Colonne gauche - Upload et liste */}
            <div className="space-y-6">
              <DocumentUpload />
              <DocumentList onViewDocument={setSelectedDocument} />
            </div>

            {/* Colonne droite - Détails */}
            <div>
              {selectedDocument ? (
                <DocumentDetails document={selectedDocument} />
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

export default Documents;
