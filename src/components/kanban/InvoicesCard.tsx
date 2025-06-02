
import { Invoice } from "@/types/project";
import { KanbanCard } from "./KanbanCard";
import { File, Calendar, Euro } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InvoiceDetailsModal } from "./InvoiceDetailsModal";

interface InvoicesCardProps {
  invoices: Invoice[];
}

export const InvoicesCard = ({ invoices }: InvoicesCardProps) => {
  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Invoice['status']) => {
    switch (status) {
      case 'draft': return 'Brouillon';
      case 'sent': return 'Envoyée';
      case 'paid': return 'Payée';
      case 'overdue': return 'En retard';
      default: return status;
    }
  };

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <KanbanCard title="Détails Factures" icon={<File className="h-5 w-5 text-green-600" />}>
      <div className="space-y-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-blue-900">Total facturé:</span>
            <span className="text-sm font-bold text-blue-900">{totalAmount.toLocaleString()} €</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-700">Montant payé:</span>
            <span className="text-sm font-bold text-green-600">{paidAmount.toLocaleString()} €</span>
          </div>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="border rounded-lg p-3 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">#{invoice.id}</span>
                <Badge className={getStatusColor(invoice.status)}>
                  {getStatusText(invoice.status)}
                </Badge>
              </div>
              
              <p className="text-xs text-gray-600 mb-2">{invoice.description}</p>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center text-gray-500">
                  <Euro className="h-3 w-3 mr-1" />
                  <span className="font-medium">{invoice.amount.toLocaleString()} €</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Échéance: {new Date(invoice.dueDate).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <InvoiceDetailsModal invoices={invoices} />
      </div>
    </KanbanCard>
  );
};
