import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Building, MapPin, User, Euro, TrendingUp, Calendar } from "lucide-react";
import { Project } from "@/types/project";
interface ProjectsListProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}
export const ProjectsList = ({
  projects,
  onProjectSelect
}: ProjectsListProps) => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-orange-100 text-orange-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'planning':
        return 'Planification';
      case 'in-progress':
        return 'En cours';
      case 'on-hold':
        return 'En pause';
      case 'completed':
        return 'Terminé';
      default:
        return status;
    }
  };
  return <div className="min-h-screen bg-cover bg-center bg-fixed relative" style={{
    backgroundImage: 'url(/lovable-uploads/9245aeac-465f-4d15-a87e-f871c3b78a39.png)'
  }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Projets de Construction
            </h1>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => <Card key={project.id} onClick={() => onProjectSelect(project)} className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white">
                <CardHeader className="pb-3 bg-white">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900 truncate">
                      {project.name}
                    </CardTitle>
                    
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 bg-white">
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="h-4 w-4 mr-2 text-orange-600" />
                    <span className="truncate">{project.client}</span>
                  </div>
                  
                  
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-green-600" />
                    <span className="truncate">{project.address}</span>
                  </div>
                  
                  
                  
                  
                  
                  
                  
                  
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>
    </div>;
};