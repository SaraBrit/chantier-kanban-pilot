
import { Task } from "@/types/project";
import { KanbanCard } from "./KanbanCard";
import { ProjectExcelImport } from "./ProjectExcelImport";
import { Kanban, Clock, User, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TaskDetailsModal } from "./TaskDetailsModal";

interface TasksCardProps {
  tasks: Task[];
  projectId: string;
  projectName: string;
}

export const TasksCard = ({ tasks, projectId, projectName }: TasksCardProps) => {
  console.log('TasksCard received tasks for project', projectId, ':', tasks);
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'done': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Task['status']) => {
    switch (status) {
      case 'todo': return 'À faire';
      case 'in-progress': return 'En cours';
      case 'review': return 'Révision';
      case 'done': return 'Terminé';
      default: return status;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return 'Faible';
      case 'medium': return 'Moyenne';
      case 'high': return 'Haute';
      default: return priority;
    }
  };

  return (
    <KanbanCard title="Avancement des Tâches" icon={<Kanban className="h-5 w-5 text-blue-600" />}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">{tasks.length} tâche(s)</span>
        <ProjectExcelImport projectId={projectId} projectName={projectName} />
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {tasks.map((task) => (
          <div key={task.id} className="border rounded-lg p-3 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm text-gray-900 truncate">{task.title}</h4>
              <Badge className={getStatusColor(task.status)}>
                {getStatusText(task.status)}
              </Badge>
            </div>
            
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge className={getPriorityColor(task.priority)} variant="outline">
                  {getPriorityText(task.priority)}
                </Badge>
                <span className="text-xs text-gray-500">{task.progress}%</span>
              </div>
              
              <Progress value={task.progress} className="h-1" />
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  <span>{task.assignee}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TaskDetailsModal tasks={tasks} />
    </KanbanCard>
  );
};
