
import { Building, ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NavigationProps {
  currentView: 'projects' | 'kanban' | 'documents';
  projectName?: string;
  onBack?: () => void;
}

export const Navigation = ({ currentView, projectName, onBack }: NavigationProps) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {currentView === 'kanban' && onBack && (
            <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div className="flex items-center space-x-2">
            <Building className="h-6 w-6 text-orange-600" />
            <span className="text-xl font-bold text-gray-900">
              {currentView === 'projects' ? 'Gestion de Chantiers' : 
               currentView === 'documents' ? 'Archive Électronique' : projectName}
            </span>
          </div>
          
          {/* Navigation links */}
          <div className="flex items-center space-x-4 ml-8">
            <Link to="/">
              <Button variant={currentView === 'projects' ? 'default' : 'ghost'} size="sm">
                <Building className="h-4 w-4 mr-2" />
                Projets
              </Button>
            </Link>
            <Link to="/documents">
              <Button variant={currentView === 'documents' ? 'default' : 'ghost'} size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </Button>
            </Link>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
    </nav>
  );
};
