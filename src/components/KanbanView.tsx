import { useState } from "react";
import { Project, Task, Invoice, MaterialRequest, Alert, ContractComplement } from "@/types/project";
import { useImportedTasks } from "@/hooks/useImportedTasks";
import { ProjectInfoCard } from "./kanban/ProjectInfoCard";
import { TasksCard } from "./kanban/TasksCard";
import { InvoicesCard } from "./kanban/InvoicesCard";
import { MaterialsCard } from "./kanban/MaterialsCard";
import { EmployeesCard } from "./kanban/EmployeesCard";
import { AlertsCard } from "./kanban/AlertsCard";

import { ChartsCard } from "./kanban/ChartsCard";
import { GanttCard } from "./kanban/GanttCard";
import { ContractComplementCard } from "./kanban/ContractComplementCard";
import { JournalDeChantierCard } from "./kanban/JournalDeChantierCard";

interface KanbanViewProps {
  project: Project;
}

export const KanbanView = ({ project }: KanbanViewProps) => {
  const { getTasksForProject } = useImportedTasks();
  const importedTasksForProject = getTasksForProject(project.id);
  
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

  // Séparer matériels et emplois
  const [materials] = useState<MaterialRequest[]>([
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
      id: "MAT-003",
      projectId: project.id,
      materialName: "Ciment Portland",
      quantity: 100,
      unit: "sacs",
      urgency: "low",
      requestDate: "2024-06-15",
      status: "approved"
    }
  ]);

  const [employees] = useState<MaterialRequest[]>([
    {
      id: "EMP-001",
      projectId: project.id,
      materialName: "Grutier qualifié",
      quantity: 1,
      unit: "personne",
      urgency: "high",
      requestDate: "2024-06-25",
      status: "pending"
    },
    {
      id: "EMP-002",
      projectId: project.id,
      materialName: "Maçons",
      quantity: 3,
      unit: "personnes",
      urgency: "medium",
      requestDate: "2024-06-28",
      status: "approved"
    },
    {
      id: "EMP-003",
      projectId: project.id,
      materialName: "Électricien",
      quantity: 2,
      unit: "personnes",
      urgency: "low",
      requestDate: "2024-07-05",
      status: "pending"
    }
  ]);

  // Add contract complements data
  const [contractComplements] = useState<ContractComplement[]>([
    {
      id: "CC-001",
      projectId: project.id,
      contractNumber: "CC-2024-001",
      description: "Ajout d'un niveau supplémentaire suite à demande client",
      amount: 120000,
      status: "approved",
      signatureDate: "2024-06-10",
      startDate: "2024-07-01",
      endDate: "2024-10-15",
      client: project.client,
      type: "additional-work"
    },
    {
      id: "CC-002",
      projectId: project.id,
      contractNumber: "CC-2024-002",
      description: "Extension du délai de livraison de 2 mois",
      amount: 15000,
      status: "executed",
      signatureDate: "2024-05-20",
      startDate: "2024-12-30",
      endDate: "2025-02-28",
      client: project.client,
      type: "extension"
    },
    {
      id: "CC-003",
      projectId: project.id,
      contractNumber: "CC-2024-003",
      description: "Modification des finitions - Matériaux premium",
      amount: 45000,
      status: "pending",
      signatureDate: "2024-06-25",
      startDate: "2024-09-01",
      endDate: "2024-11-30",
      client: project.client,
      type: "modification"
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
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Messages d'Alertes - Top of page */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-1 h-6 bg-red-500 mr-3 rounded"></span>
            Messages d'Alertes
          </h2>
          <AlertsCard alerts={alerts} onMarkAsRead={handleMarkAsRead} />
        </div>
        
        {/* Section Projet */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded"></span>
            Section Projet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProjectInfoCard project={project} />
            <TasksCard tasks={[...tasks, ...importedTasksForProject]} projectId={project.id} projectName={project.name} />
            <JournalDeChantierCard projectId={project.id} tasks={tasks} invoices={invoices} />
          </div>
        </div>

        {/* Section Finance */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-1 h-6 bg-green-500 mr-3 rounded"></span>
            Section Finance
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <InvoicesCard invoices={invoices} />
            <ContractComplementCard contracts={contractComplements} />
            <ChartsCard project={project} />
          </div>
        </div>

        {/* Bottom Row: Demandes & Rapport d'Analyse */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* Section Demandes */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-1 h-6 bg-orange-500 mr-3 rounded"></span>
              Section Demandes
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <MaterialsCard materials={materials} />
              <EmployeesCard employees={employees} />
            </div>
          </div>

          {/* Section Rapport d'Analyse */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-1 h-6 bg-purple-500 mr-3 rounded"></span>
              Rapport d'Analyse
            </h2>
            <div className="space-y-4">
              <GanttCard />
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
};
