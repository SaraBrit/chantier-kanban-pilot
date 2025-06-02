
import { MaterialRequest } from "@/types/project";
import { KanbanCard } from "./KanbanCard";
import { Package, Calendar, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface MaterialsCardProps {
  materials: MaterialRequest[];
}

export const MaterialsCard = ({ materials }: MaterialsCardProps) => {
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
      case 'ordered': return 'Commandé';
      case 'delivered': return 'Livré';
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
    <KanbanCard title="Demandes Matériels" icon={<Package className="h-5 w-5 text-blue-600" />}>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {materials.slice(0, 3).map((material) => (
          <div key={material.id} className="border rounded-lg p-3 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm text-gray-900">{material.materialName}</h4>
              <Badge className={getStatusColor(material.status)}>
                {getStatusText(material.status)}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center text-xs text-gray-600">
                <Package className="h-3 w-3 mr-1" />
                <span>{material.quantity} {material.unit}</span>
              </div>
              <Badge className={getUrgencyColor(material.urgency)} variant="outline">
                {getUrgencyText(material.urgency)}
              </Badge>
            </div>
            
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Demandé le: {new Date(material.requestDate).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full mt-3">
            <Eye className="h-4 w-4 mr-2" />
            Voir tous les matériels
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Détails des Demandes Matériels
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Matériel</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Urgence</TableHead>
                  <TableHead>Date demande</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell className="font-medium">{material.materialName}</TableCell>
                    <TableCell>{material.quantity} {material.unit}</TableCell>
                    <TableCell>
                      <Badge className={getUrgencyColor(material.urgency)} variant="outline">
                        {getUrgencyText(material.urgency)}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(material.requestDate).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(material.status)}>
                        {getStatusText(material.status)}
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
