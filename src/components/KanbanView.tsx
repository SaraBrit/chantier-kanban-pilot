
import { useState } from "react";
import { Project, Task, Invoice, MaterialRequest, Alert } from "@/types/project";
import { ProjectInfoCard } from "./kanban/ProjectInfoCard";
import { TasksCard } from "./kanban/TasksCard";
import { InvoicesCard } from "./kanban/InvoicesCard";
import { MaterialRequestsCard } from "./kanban/MaterialRequestsCard";
import { AlertsCard } from "./kanban/AlertsCard";
import { StatsCard } from "./kanban/StatsCard";

interface KanbanViewProps {
  project: Project;
}

export const KanbanView = ({ project }: KanbanViewProps) => {
  // Données mock pour la démonstration
  const [tasks] = useState<Task[]>([
    {
      id: "task-1",
      title: "Préparation du terrain",
      description: "Nivellement et préparation de la fondation",
      status: "done",
      priority: "high",
      assignee: "Jean Dupont",
      dueDate: "2024-06-15",
      progress: 100
    },
    {
      id: "task-2",
      title: "Coulage des fondations",
      description: "Installation de l'armature et coulage du béton",
      status: "in-progress",
      priority: "high",
      assignee: "Marie Martin",
      dueDate: "2024-06-25",
      progress: 65
    },
    {
      id: "task-3",
      title: "Montage de la structure",
      description: "Assemblage de la charpente métallique",
      status: "todo",
      priority: "medium",
      assignee: "Pierre Leroy",
      dueDate: "2024-07-10",
      progress: 0
    }
  ]);

  const [invoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      projectId: project.id,
      amount: 15000,
      status: "paid",
      issueDate: "2024-05-01",
      dueDate: "2024-05-31",
      description: "Facture de préparation du terrain"
    },
    {
      id: "INV-002",
      projectId: project.id,
      amount: 25000,
      status: "sent",
      issueDate: "2024-06-01",
      dueDate: "2024-06-30",
      description: "Facture des fondations"
    },
    {
      id: "INV-003",
      projectId: project.id,
      amount: 18000,
      status: "draft",
      issueDate: "2024-06-15",
      dueDate: "2024-07-15",
      description: "Facture structure métallique"
    }
  ]);

  const [materialRequests] = useState<MaterialRequest[]>([
    {
      id: "MAT-001",
      projectId: project.id,
      materialName: "Béton C25/30",
      quantity: 50,
      unit: "m³",
      urgency: "high",
      requestDate: "2024-06-10",
      status: "delivered"
    },
    {
      id: "MAT-002",
      projectId: project.id,
      materialName: "Poutrelles métalliques",
      quantity: 20,
      unit: "pièces",
      urgency: "medium",
      requestDate: "2024-06-20",
      status: "ordered"
    },
    {
      id: "EMP-001",
      projectId: project.id,
      materialName: "Grutier qualifié",
      quantity: 1,
      unit: "personne",
      urgency: "high",
      requestDate: "2024-06-25",
      status: "pending"
    }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "alert-1",
      projectId: project.id,
      type: "budget-overrun",
      message: "Le budget prévu pour les fondations risque d'être dépassé de 8%",
      severity: "warning",
      date: "2024-06-20T10:30:00",
      isRead: false
    },
    {
      id: "alert-2",
      projectId: project.id,
      type: "deadline-delay",
      message: "Retard de 3 jours sur la livraison des poutrelles métalliques",
      severity: "error",
      date: "2024-06-18T14:15:00",
      isRead: false
    },
    {
      id: "alert-3",
      projectId: project.id,
      type: "material-shortage",
      message: "Commande de béton supplémentaire nécessaire",
      severity: "info",
      date: "2024-06-15T09:00:00",
      isRead: true
    }
  ]);

  const handleMarkAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne 1 */}
          <div className="space-y-6">
            <ProjectInfoCard project={project} />
            <InvoicesCard invoices={invoices} />
          </div>

          {/* Colonne 2 */}
          <div className="space-y-6">
            <TasksCard tasks={tasks} />
            <MaterialRequestsCard requests={materialRequests} />
          </div>

          {/* Colonne 3 */}
          <div className="space-y-6">
            <AlertsCard alerts={alerts} onMarkAsRead={handleMarkAsRead} />
            <StatsCard project={project} />
          </div>
        </div>
      </div>
    </div>
  );
};
