
import { useState } from "react";
import { Project } from "@/types/project";
import { Navigation } from "@/components/Navigation";
import { ProjectsList } from "@/components/ProjectsList";
import { KanbanView } from "@/components/KanbanView";
import { PlanDeChargeTable } from "@/components/PlanDeChargeTable";

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
      phone: "+213 21 123 456",
      email: "contact@sci-immobilier.dz",
      status: "in-progress",
      startDate: "2024-04-15",
      endDate: "2024-12-30",
      budget: 850000,
      spent: 320000,
      progress: 45,
      category: "VRD"
    },
    {
      id: "PRJ-002",
      name: "Centre Commercial Étoile",
      client: "Groupe Retail France",
      projectManager: "Sophie Dubois",
      monthlyBilling: 75000,
      address: "Zone Commerciale Nord, 69100 Lyon",
      phone: "+213 31 987 654",
      email: "sophie.dubois@retail-dz.com",
      status: "in-progress",
      startDate: "2024-03-01",
      endDate: "2025-06-15",
      budget: 1200000,
      spent: 480000,
      progress: 35,
      category: "Equipements"
    },
    {
      id: "PRJ-003",
      name: "Bureaux Tech Valley",
      client: "Innovation Technologies",
      projectManager: "Marc Lefevre",
      monthlyBilling: 55000,
      address: "Parc Technologique, 06560 Sophia Antipolis",
      phone: "+213 41 555 123",
      email: "m.lefevre@innovation-tech.dz",
      status: "planning",
      startDate: "2024-07-01",
      endDate: "2025-03-31",
      budget: 950000,
      spent: 0,
      progress: 0,
      category: "Bon de commande"
    },
    {
      id: "PRJ-004",
      name: "Entrepôt Logistique Est",
      client: "TransLog Europe",
      projectManager: "Claire Rousseau",
      monthlyBilling: 35000,
      address: "Zone Industrielle, 67200 Strasbourg",
      phone: "+213 25 444 789",
      email: "c.rousseau@translog.dz",
      status: "completed",
      startDate: "2023-09-15",
      endDate: "2024-05-30",
      budget: 600000,
      spent: 580000,
      progress: 100,
      category: "VRD"
    },
    {
      id: "PRJ-005",
      name: "Hôpital Régional Sud",
      client: "CHR Méditerranée",
      projectManager: "Dr. Philippe Martin",
      monthlyBilling: 95000,
      address: "Boulevard de la Santé, 13000 Marseille",
      phone: "+213 21 333 888",
      email: "p.martin@chr-med.dz",
      status: "in-progress",
      startDate: "2024-01-10",
      endDate: "2025-12-20",
      budget: 2200000,
      spent: 890000,
      progress: 28,
      category: "Equipements"
    },
    {
      id: "PRJ-006",
      name: "École Primaire Horizon",
      client: "Mairie de Nantes",
      projectManager: "Isabelle Garnier",
      monthlyBilling: 28000,
      address: "Rue de l'Éducation, 44000 Nantes",
      phone: "+213 27 222 456",
      email: "i.garnier@mairie-alger.dz",
      status: "on-hold",
      startDate: "2024-05-01",
      endDate: "2024-11-15",
      budget: 420000,
      spent: 125000,
      progress: 15,
      category: "Bon de commande"
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
        <div>
          <ProjectsList 
            projects={projects}
            onProjectSelect={handleProjectSelect}
          />
          <div className="container mx-auto px-4 pb-8">
            <PlanDeChargeTable projects={projects} />
          </div>
        </div>
      ) : (
        selectedProject && <KanbanView project={selectedProject} />
      )}
    </div>
  );
};

export default Index;
