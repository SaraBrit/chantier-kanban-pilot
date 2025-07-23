import React from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3 } from "lucide-react";

interface PlanDeChargeTableProps {
  projects: Project[];
}

export const PlanDeChargeTable = ({ projects }: PlanDeChargeTableProps) => {
  // Grouper les projets par catégorie
  const projectsByCategory = projects.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = [];
    }
    acc[project.category].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  // Calcul des données pour chaque projet
  const calculateProjectData = (project: Project) => {
    const montantGlobal = project.budget;
    const tauxRealisation = project.progress;
    const montantRealise = (project.budget * project.progress) / 100;
    const montantResteARealiser = project.budget - montantRealise;
    
    // Estimation du montant réalisé par trimestre (basé sur la durée du projet)
    const startDate = new Date(project.startDate);
    const endDate = new Date(project.endDate);
    const durationMonths = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    const nombreTrimestres = Math.ceil(durationMonths / 3);
    const montantParTrimestre = nombreTrimestres > 0 ? montantRealise / nombreTrimestres : 0;

    return {
      montantGlobal,
      tauxRealisation,
      montantRealise,
      montantResteARealiser,
      montantParTrimestre
    };
  };

  // Calcul des totaux pour une catégorie
  const calculateCategoryTotals = (categoryProjects: Project[]) => {
    return categoryProjects.reduce((totals, project) => {
      const data = calculateProjectData(project);
      return {
        montantGlobal: totals.montantGlobal + data.montantGlobal,
        montantParTrimestre: totals.montantParTrimestre + data.montantParTrimestre,
        montantResteARealiser: totals.montantResteARealiser + data.montantResteARealiser
      };
    }, { montantGlobal: 0, montantParTrimestre: 0, montantResteARealiser: 0 });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount) + ' DA';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return "bg-red-500";
    if (percentage > 50) return "bg-green-500";
    return "bg-yellow-500"; // exactly 50%
  };

  const getTextColor = (percentage: number) => {
    if (percentage < 50) return "text-red-600";
    if (percentage > 50) return "text-green-600";
    return "text-yellow-600"; // exactly 50%
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-semibold">
          <BarChart3 className="mr-2 h-5 w-5" />
          Plan de Charge
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Désignation</TableHead>
                <TableHead>Numéro</TableHead>
                <TableHead className="min-w-[150px]">Maître d'Ouvrage</TableHead>
                <TableHead className="min-w-[180px]">Montant Global HT</TableHead>
                <TableHead>Taux de Réalisation</TableHead>
                <TableHead className="min-w-[150px]">Montant Réalisé/Trimestre</TableHead>
                <TableHead className="min-w-[150px]">Montant Reste à Réaliser</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(projectsByCategory).map(([category, categoryProjects]) => {
                const categoryTotals = calculateCategoryTotals(categoryProjects);
                
                return (
                  <React.Fragment key={category}>
                    {/* En-tête de catégorie */}
                    <TableRow className="bg-muted/50">
                      <TableCell className="font-bold text-lg" colSpan={7}>
                        {category}
                      </TableCell>
                    </TableRow>
                    
                    {/* Projets de la catégorie */}
                    {categoryProjects.map((project) => {
                      const data = calculateProjectData(project);
                      return (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium pl-8">{project.name}</TableCell>
                          <TableCell>{project.id}</TableCell>
                          <TableCell>{project.client}</TableCell>
                          <TableCell>{formatCurrency(data.montantGlobal)}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className={`mr-2 font-medium ${getTextColor(data.tauxRealisation)}`}>
                                {data.tauxRealisation}%
                              </span>
                              <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-300 ${getProgressColor(data.tauxRealisation)}`}
                                  style={{ width: `${data.tauxRealisation}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{formatCurrency(data.montantParTrimestre)}</TableCell>
                          <TableCell>{formatCurrency(data.montantResteARealiser)}</TableCell>
                        </TableRow>
                      );
                    })}
                    
                    {/* Ligne de total pour la catégorie */}
                    <TableRow className="bg-accent/30 border-t-2 font-semibold">
                      <TableCell className="font-bold pl-8">Total {category}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell className="font-bold">{formatCurrency(categoryTotals.montantGlobal)}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell className="font-bold">{formatCurrency(categoryTotals.montantParTrimestre)}</TableCell>
                      <TableCell className="font-bold">{formatCurrency(categoryTotals.montantResteARealiser)}</TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};