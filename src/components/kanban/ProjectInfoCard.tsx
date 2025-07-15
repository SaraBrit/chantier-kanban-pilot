import { Project } from "@/types/project";
import { KanbanCard } from "./KanbanCard";
import { Building, User, MapPin, Euro, Calendar, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
interface ProjectInfoCardProps {
  project: Project;
}
export const ProjectInfoCard = ({
  project
}: ProjectInfoCardProps) => {
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
  return <KanbanCard title="Fiche Projet" icon={<Building className="h-5 w-5 text-orange-600" />}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">ID:</span>
          <span className="text-sm text-gray-900">{project.id}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Statut:</span>
          <Badge className={getStatusColor(project.status)}>
            {getStatusText(project.status)}
          </Badge>
        </div>

        <div className="flex items-start justify-between">
          <span className="text-sm font-medium text-gray-600">Maître d'ouvrage:</span>
          <span className="text-sm text-gray-900 text-right max-w-40">{project.client}</span>
        </div>

        <div className="flex items-start justify-between">
          <span className="text-sm font-medium text-gray-600">Chef de projet:</span>
          <span className="text-sm text-gray-900 text-right max-w-40">{project.projectManager}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <span className="text-sm font-medium text-gray-600">Téléphone:</span>
            <span className="text-sm text-gray-900 text-right max-w-40">{project.phone}</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-sm font-medium text-gray-600">Email:</span>
            <span className="text-sm text-gray-900 text-right max-w-40">{project.email}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600"><span className="text-sm font-medium text-gray-600">Montant général:</span> </span>
          <span className="text-sm font-semibold text-green-600">
            {project.budget.toLocaleString()} DA
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Avancement:</span>
            <span className="text-sm font-semibold text-gray-900">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Budget:</span>
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-900">
              {project.spent.toLocaleString()} / {project.budget.toLocaleString()} DA
            </div>
            <div className="text-xs text-gray-500">
              {(project.spent / project.budget * 100).toFixed(1)}% utilisé
            </div>
          </div>
        </div>

        <div className="pt-2 border-t space-y-2">
          <div className="text-center">
            <span className="text-xs font-medium text-gray-600">DÉLAI DE RÉALISATION</span>
            <div className="text-sm font-semibold text-blue-600">
              {Math.round((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30.44))} mois
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Début: {new Date(project.startDate).toLocaleDateString('fr-FR')}</span>
            <span>Fin: {new Date(project.endDate).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
      </div>
    </KanbanCard>;
};