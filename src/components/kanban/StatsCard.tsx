
import { Project } from "@/types/project";
import { KanbanCard } from "./KanbanCard";
import { TrendingUp, Calendar, Euro, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StatsCardProps {
  project: Project;
}

export const StatsCard = ({ project }: StatsCardProps) => {
  const budgetUsagePercentage = (project.spent / project.budget) * 100;
  const today = new Date();
  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);
  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const elapsedDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const timeProgress = Math.min(Math.max((elapsedDays / totalDays) * 100, 0), 100);

  return (
    <KanbanCard title="Statistiques & Rapports" icon={<TrendingUp className="h-5 w-5 text-purple-600" />}>
      <div className="space-y-6">
        {/* Budget Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Euro className="h-4 w-4 mr-2 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Utilisation Budget</span>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {budgetUsagePercentage.toFixed(1)}%
            </span>
          </div>
          <Progress value={budgetUsagePercentage} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{project.spent.toLocaleString()} € dépensé</span>
            <span>{project.budget.toLocaleString()} € budget</span>
          </div>
        </div>

        {/* Time Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Progression Temps</span>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {timeProgress.toFixed(1)}%
            </span>
          </div>
          <Progress value={timeProgress} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{elapsedDays} jours écoulés</span>
            <span>{totalDays} jours total</span>
          </div>
        </div>

        {/* Project Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">Avancement Projet</span>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {project.progress}%
            </span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Performance Indicators */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-blue-900">
              {(project.progress / timeProgress).toFixed(1)}
            </div>
            <div className="text-xs text-blue-700">Efficacité</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-green-900">
              {((project.budget - project.spent) / 1000).toFixed(0)}k€
            </div>
            <div className="text-xs text-green-700">Reste budget</div>
          </div>
        </div>

        {/* Warning Indicators */}
        {budgetUsagePercentage > 80 && (
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                Attention: 80% du budget utilisé
              </span>
            </div>
          </div>
        )}

        {project.progress < timeProgress * 0.8 && (
          <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-red-600" />
              <span className="text-sm font-medium text-red-800">
                Retard détecté sur le planning
              </span>
            </div>
          </div>
        )}
      </div>
    </KanbanCard>
  );
};
