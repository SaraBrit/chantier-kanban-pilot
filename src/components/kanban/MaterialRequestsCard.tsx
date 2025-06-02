import { MaterialRequest } from "@/types/project";
import { KanbanCard } from "./KanbanCard";
import { HardHat, Package, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MaterialRequestsCardProps {
  requests: MaterialRequest[];
}

export const MaterialRequestsCard = ({ requests }: MaterialRequestsCardProps) => {
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
    <KanbanCard title="Demandes Matériels & Emplois" icon={<HardHat className="h-5 w-5 text-yellow-600" />}>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {requests.map((request) => (
          <div key={request.id} className="border rounded-lg p-3 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm text-gray-900">{request.materialName}</h4>
              <Badge className={getStatusColor(request.status)}>
                {getStatusText(request.status)}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center text-xs text-gray-600">
                <Package className="h-3 w-3 mr-1" />
                <span>{request.quantity} {request.unit}</span>
              </div>
              <Badge className={getUrgencyColor(request.urgency)} variant="outline">
                {getUrgencyText(request.urgency)}
              </Badge>
            </div>
            
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Demandé le: {new Date(request.requestDate).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        ))}
      </div>
    </KanbanCard>
  );
};
