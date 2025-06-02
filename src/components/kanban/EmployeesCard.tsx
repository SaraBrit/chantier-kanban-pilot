
import { MaterialRequest } from "@/types/project";
import { KanbanCard } from "./KanbanCard";
import { Users, Calendar, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface EmployeesCardProps {
  employees: MaterialRequest[];
}

export const EmployeesCard = ({ employees }: EmployeesCardProps) => {
  const getStatusColor = (status: MaterialRequest['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'ordered': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: MaterialRequest['status']) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'approved': return 'Approuvé';
      case 'ordered': return 'Assigné';
      case 'delivered': return 'Disponible';
      default: return status;
    }
  };

  const getUrgencyColor = (urgency: MaterialRequest['urgency']) => {
    switch (urgency) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyText = (urgency: MaterialRequest['urgency']) => {
    switch (urgency) {
      case 'low': return 'Faible';
      case 'medium': return 'Moyenne';
      case 'high': return 'Haute';
      default: return urgency;
    }
  };

  return (
    <KanbanCard title="Demandes Emplois" icon={<Users className="h-5 w-5 text-orange-600" />}>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {employees.slice(0, 3).map((employee) => (
          <div key={employee.id} className="border rounded-lg p-3 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm text-gray-900">{employee.materialName}</h4>
              <Badge className={getStatusColor(employee.status)}>
                {getStatusText(employee.status)}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center text-xs text-gray-600">
                <Users className="h-3 w-3 mr-1" />
                <span>{employee.quantity} {employee.unit}</span>
              </div>
              <Badge className={getUrgencyColor(employee.urgency)} variant="outline">
                {getUrgencyText(employee.urgency)}
              </Badge>
            </div>
            
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Demandé le: {new Date(employee.requestDate).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full mt-3">
            <Eye className="h-4 w-4 mr-2" />
            Voir tous les emplois
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Détails des Demandes Emplois
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Poste</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Urgence</TableHead>
                  <TableHead>Date demande</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.materialName}</TableCell>
                    <TableCell>{employee.quantity} {employee.unit}</TableCell>
                    <TableCell>
                      <Badge className={getUrgencyColor(employee.urgency)} variant="outline">
                        {getUrgencyText(employee.urgency)}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(employee.requestDate).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(employee.status)}>
                        {getStatusText(employee.status)}
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
