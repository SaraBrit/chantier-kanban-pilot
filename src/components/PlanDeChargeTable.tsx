import { Project } from "@/types/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3 } from "lucide-react";

interface PlanDeChargeTableProps {
  projects: Project[];
}

export const PlanDeChargeTable = ({ projects }: PlanDeChargeTableProps) => {
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
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
              {projects.map((project) => {
                const data = calculateProjectData(project);
                return (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.id}</TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>{formatCurrency(data.montantGlobal)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">{data.tauxRealisation}%</span>
                        <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-300"
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
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};