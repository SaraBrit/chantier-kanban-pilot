
import { ContractComplement } from "@/types/project";
import { KanbanCard } from "./KanbanCard";
import { FileText, Calendar, Euro, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ContractComplementCardProps {
  contracts: ContractComplement[];
}

export const ContractComplementCard = ({ contracts }: ContractComplementCardProps) => {
  const getStatusColor = (status: ContractComplement['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'executed': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: ContractComplement['status']) => {
    switch (status) {
      case 'draft': return 'Brouillon';
      case 'pending': return 'En attente';
      case 'approved': return 'Approuvé';
      case 'executed': return 'En cours';
      case 'completed': return 'Terminé';
      default: return status;
    }
  };

  const getTypeText = (type: ContractComplement['type']) => {
    switch (type) {
      case 'modification': return 'Modification';
      case 'extension': return 'Extension';
      case 'additional-work': return 'Travaux supplémentaires';
      case 'budget-increase': return 'Augmentation budget';
      default: return type;
    }
  };

  const totalAmount = contracts.reduce((sum, contract) => sum + contract.amount, 0);
  const approvedAmount = contracts.filter(c => c.status === 'approved' || c.status === 'executed' || c.status === 'completed').reduce((sum, contract) => sum + contract.amount, 0);

  return (
    <KanbanCard title="Contrats Complémentaires" icon={<FileText className="h-5 w-5 text-blue-600" />}>
      <div className="space-y-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-blue-900">Total contrats:</span>
            <span className="text-sm font-bold text-blue-900">{totalAmount.toLocaleString()} €</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-700">Montant approuvé:</span>
            <span className="text-sm font-bold text-green-600">{approvedAmount.toLocaleString()} €</span>
          </div>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {contracts.slice(0, 3).map((contract) => (
            <div key={contract.id} className="border rounded-lg p-3 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">#{contract.contractNumber}</span>
                <Badge className={getStatusColor(contract.status)}>
                  {getStatusText(contract.status)}
                </Badge>
              </div>
              
              <p className="text-xs text-gray-600 mb-2">{contract.description}</p>
              
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-purple-600 font-medium">{getTypeText(contract.type)}</span>
                <div className="flex items-center text-gray-500">
                  <Euro className="h-3 w-3 mr-1" />
                  <span className="font-medium">{contract.amount.toLocaleString()} €</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  <span>{contract.client}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{new Date(contract.signatureDate).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              Voir tous les contrats
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Contrats Complémentaires - Détails
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              {contracts.map((contract) => (
                <div key={contract.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg">#{contract.contractNumber}</h3>
                      <Badge className={getStatusColor(contract.status)}>
                        {getStatusText(contract.status)}
                      </Badge>
                    </div>
                    <span className="text-lg font-bold text-green-600">
                      {contract.amount.toLocaleString()} €
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{contract.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Type:</span>
                      <span className="ml-2 text-purple-600">{getTypeText(contract.type)}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Client:</span>
                      <span className="ml-2">{contract.client}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Signature:</span>
                      <span className="ml-2">{new Date(contract.signatureDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Période:</span>
                      <span className="ml-2">
                        {new Date(contract.startDate).toLocaleDateString('fr-FR')} - {new Date(contract.endDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </KanbanCard>
  );
};
