
import { useState } from "react";
import { Project } from "@/types/project";
import { Navigation } from "@/components/Navigation";
import { ProjectsList } from "@/components/ProjectsList";
import { KanbanView } from "@/components/KanbanView";

const Index = () => {
  const [currentView, setCurrentView] = useState<'projects' | 'kanban'>('projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Données mock pour la démonstration
  const projects: Project[] = [
    {
      id: "PRJ-001",
      name: "Résidence Les Jardins",
      client: "SCI Immobilier Plus",
      projectManager: "Antoine Moreau",
      monthlyBilling: 45000,
      address: "15 Avenue des Champs, 75008 Paris",
      status: "in-progress",
      startDate: "2024-04-15",
      endDate: "2024-12-30",
      budget: 850000,
      spent: 320000,
      progress: 45
    },
    {
      id: "PRJ-002",
      name: "Centre Commercial Étoile",
      client: "Groupe Retail France",
      projectManager: "Sophie Dubois",
      monthlyBilling: 75000,
      address: "Zone Commerciale Nord, 69100 Lyon",
      status: "in-progress",
      startDate: "2024-03-01",
      endDate: "2025-06-15",
      budget: 1200000,
      spent: 480000,
      progress: 35
    },
    {
      id: "PRJ-003",
      name: "Bureaux Tech Valley",
      client: "Innovation Technologies",
      projectManager: "Marc Lefevre",
      monthlyBilling: 55000,
      address: "Parc Technologique, 06560 Sophia Antipolis",
      status: "planning",
      startDate: "2024-07-01",
      endDate: "2025-03-31",
      budget: 950000,
      spent: 0,
      progress: 0
    },
    {
      id: "PRJ-004",
      name: "Entrepôt Logistique Est",
      client: "TransLog Europe",
      projectManager: "Claire Rousseau",
      monthlyBilling: 35000,
      address: "Zone Industrielle, 67200 Strasbourg",
      status: "completed",
      startDate: "2023-09-15",
      endDate: "2024-05-30",
      budget: 600000,
      spent: 580000,
      progress: 100
    },
    {
      id: "PRJ-005",
      name: "Hôpital Régional Sud",
      client: "CHR Méditerranée",
      projectManager: "Dr. Philippe Martin",
      monthlyBilling: 95000,
      address: "Boulevard de la Santé, 13000 Marseille",
      status: "in-progress",
      startDate: "2024-01-10",
      endDate: "2025-12-20",
      budget: 2200000,
      spent: 890000,
      progress: 28
    },
    {
      id: "PRJ-006",
      name: "École Primaire Horizon",
      client: "Mairie de Nantes",
      projectManager: "Isabelle Garnier",
      monthlyBilling: 28000,
      address: "Rue de l'Éducation, 44000 Nantes",
      status: "on-hold",
      startDate: "2024-05-01",
      endDate: "2024-11-15",
      budget: 420000,
      spent: 125000,
      progress: 15
    }
  ];

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('kanban');
  };

  const handleBackToProjects = () => {
    setCurrentView('projects');
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentView={currentView}
        projectName={selectedProject?.name}
        onBack={currentView === 'kanban' ? handleBackToProjects : undefined}
      />
      
      {currentView === 'projects' ? (
        <ProjectsList 
          projects={projects}
          onProjectSelect={handleProjectSelect}
        />
      ) : (
        selectedProject && <KanbanView project={selectedProject} />
      )}
    </div>
  );
};

export default Index;
