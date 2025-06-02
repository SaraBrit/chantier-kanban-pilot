
import { KanbanCard } from "./KanbanCard";
import { Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface GanttTask {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  dependencies: string[];
}

interface GanttCardProps {
  tasks?: GanttTask[];
}

export const GanttCard = ({ tasks = [] }: GanttCardProps) => {
  // Données mock pour le diagramme de Gantt
  const defaultTasks: GanttTask[] = [
    {
      id: "1",
      name: "Préparation terrain",
      startDate: "2024-04-15",
      endDate: "2024-05-15",
      progress: 100,
      dependencies: []
    },
    {
      id: "2",
      name: "Fondations",
      startDate: "2024-05-16",
      endDate: "2024-06-30",
      progress: 80,
      dependencies: ["1"]
    },
    {
      id: "3",
      name: "Structure",
      startDate: "2024-07-01",
      endDate: "2024-09-15",
      progress: 0,
      dependencies: ["2"]
    },
    {
      id: "4",
      name: "Finitions",
      startDate: "2024-09-16",
      endDate: "2024-12-30",
      progress: 0,
      dependencies: ["3"]
    }
  ];

  const ganttTasks = tasks.length > 0 ? tasks : defaultTasks;

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress > 50) return 'bg-blue-500';
    if (progress > 0) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculatePosition = (startDate: string, projectStart: string = "2024-04-15") => {
    const start = new Date(startDate);
    const projectStartDate = new Date(projectStart);
    const diffTime = start.getTime() - projectStartDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const projectDuration = 259; // jours total du projet

  return (
    <KanbanCard 
      title="Diagramme de Gantt" 
      icon={<Calendar className="h-5 w-5 text-green-600" />}
    >
      <div className="space-y-2">
        {ganttTasks.slice(0, 4).map((task) => {
          const duration = calculateDuration(task.startDate, task.endDate);
          const position = calculatePosition(task.startDate);
          const widthPercent = (duration / projectDuration) * 100;
          const leftPercent = (position / projectDuration) * 100;

          return (
            <div key={task.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700 truncate">{task.name}</span>
                <span className="text-xs text-gray-500">{task.progress}%</span>
              </div>
              <div className="relative h-4 bg-gray-100 rounded-sm">
                <div
                  className={`absolute h-full rounded-sm ${getProgressColor(task.progress)}`}
                  style={{
                    left: `${leftPercent}%`,
                    width: `${widthPercent * (task.progress / 100)}%`
                  }}
                />
                <div
                  className="absolute h-full border border-gray-300 rounded-sm bg-gray-50 opacity-50"
                  style={{
                    left: `${leftPercent}%`,
                    width: `${widthPercent}%`
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{new Date(task.startDate).toLocaleDateString('fr-FR')}</span>
                <span>{new Date(task.endDate).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full mt-3">
            <Eye className="h-4 w-4 mr-2" />
            Vue Gantt complète
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Diagramme de Gantt Détaillé
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="space-y-4">
              {ganttTasks.map((task) => {
                const duration = calculateDuration(task.startDate, task.endDate);
                const position = calculatePosition(task.startDate);
                const widthPercent = (duration / projectDuration) * 100;
                const leftPercent = (position / projectDuration) * 100;

                return (
                  <div key={task.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{task.name}</h4>
                        <p className="text-xs text-gray-500">
                          {new Date(task.startDate).toLocaleDateString('fr-FR')} - {new Date(task.endDate).toLocaleDateString('fr-FR')}
                          ({duration} jours)
                        </p>
                      </div>
                      <span className="text-sm font-medium">{task.progress}%</span>
                    </div>
                    <div className="relative h-6 bg-gray-100 rounded">
                      <div
                        className={`absolute h-full rounded ${getProgressColor(task.progress)}`}
                        style={{
                          left: `${leftPercent}%`,
                          width: `${widthPercent * (task.progress / 100)}%`
                        }}
                      />
                      <div
                        className="absolute h-full border-2 border-gray-300 rounded bg-gray-50 opacity-30"
                        style={{
                          left: `${leftPercent}%`,
                          width: `${widthPercent}%`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 flex items-center space-x-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                <span>Terminé (100%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                <span>En cours (>50%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
                <span>Démarré (&lt;50%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded mr-1"></div>
                <span>Pas démarré (0%)</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </KanbanCard>
  );
};
