
import { KanbanCard } from "./KanbanCard";
import { Ruler, Eye, Calendar, FileText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface MeterReport {
  id: string;
  phase: string;
  description: string;
  unit: string;
  plannedQuantity: number;
  completedQuantity: number;
  date: string;
  validator: string;
  status: 'pending' | 'validated' | 'rejected';
}

interface MeterReportCardProps {
  reports?: MeterReport[];
}

export const MeterReportCard = ({ reports = [] }: MeterReportCardProps) => {
  // Données mock pour la démonstration
  const defaultReports: MeterReport[] = [
    {
      id: "MET-001",
      phase: "Fondations",
      description: "Excavation terrain",
      unit: "m³",
      plannedQuantity: 150,
      completedQuantity: 150,
      date: "2024-06-15",
      validator: "Jean Dupont",
      status: 'validated'
    },
    {
      id: "MET-002",
      phase: "Gros œuvre",
      description: "Coulage béton fondations",
      unit: "m³",
      plannedQuantity: 50,
      completedQuantity: 45,
      date: "2024-06-20",
      validator: "Marie Martin",
      status: 'validated'
    },
    {
      id: "MET-003",
      phase: "Structure",
      description: "Pose poutrelles métalliques",
      unit: "ml",
      plannedQuantity: 120,
      completedQuantity: 80,
      date: "2024-06-25",
      validator: "Pierre Leroy",
      status: 'pending'
    }
  ];

  const meterReports = reports.length > 0 ? reports : defaultReports;

  const getStatusColor = (status: MeterReport['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'validated': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: MeterReport['status']) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'validated': return 'Validé';
      case 'rejected': return 'Rejeté';
      default: return status;
    }
  };

  const getCompletionPercentage = (completed: number, planned: number) => {
    return Math.round((completed / planned) * 100);
  };

  return (
    <KanbanCard title="Rapport Métreur" icon={<Ruler className="h-5 w-5 text-indigo-600" />}>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {meterReports.slice(0, 3).map((report) => (
          <div key={report.id} className="border rounded-lg p-3 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm text-gray-900">{report.phase}</h4>
              <Badge className={getStatusColor(report.status)}>
                {getStatusText(report.status)}
              </Badge>
            </div>
            
            <p className="text-xs text-gray-600 mb-2">{report.description}</p>
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center text-xs text-gray-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>{report.completedQuantity}/{report.plannedQuantity} {report.unit}</span>
              </div>
              <span className="text-xs font-medium text-blue-600">
                {getCompletionPercentage(report.completedQuantity, report.plannedQuantity)}%
              </span>
            </div>
            
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Validé le: {new Date(report.date).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full mt-3">
            <Eye className="h-4 w-4 mr-2" />
            Voir rapport complet
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Rapport Métreur Détaillé
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phase</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Prévu</TableHead>
                  <TableHead>Réalisé</TableHead>
                  <TableHead>%</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Validateur</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meterReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.phase}</TableCell>
                    <TableCell>{report.description}</TableCell>
                    <TableCell>{report.plannedQuantity} {report.unit}</TableCell>
                    <TableCell>{report.completedQuantity} {report.unit}</TableCell>
                    <TableCell>
                      <span className={getCompletionPercentage(report.completedQuantity, report.plannedQuantity) === 100 ? 'text-green-600 font-medium' : 'text-blue-600'}>
                        {getCompletionPercentage(report.completedQuantity, report.plannedQuantity)}%
                      </span>
                    </TableCell>
                    <TableCell>{new Date(report.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>{report.validator}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(report.status)}>
                        {getStatusText(report.status)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </KanbanCard>
  );
};
