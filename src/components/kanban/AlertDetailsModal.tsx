
import { Alert } from "@/types/project";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, AlertTriangle, Info, Clock } from "lucide-react";

interface AlertDetailsModalProps {
  alerts: Alert[];
  onMarkAsRead: (alertId: string) => void;
}

export const AlertDetailsModal = ({ alerts, onMarkAsRead }: AlertDetailsModalProps) => {
  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'info': return <Info className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getTypeText = (type: Alert['type']) => {
    switch (type) {
      case 'budget-overrun': return 'Dépassement budget';
      case 'deadline-delay': return 'Retard planning';
      case 'material-shortage': return 'Pénurie matériel';
      default: return type;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full mt-2">
          <Eye className="h-4 w-4 mr-2" />
          Voir détails
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Détails des Alertes
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Sévérité</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id} className={!alert.isRead ? 'bg-red-50' : ''}>
                  <TableCell>
                    <Badge variant="outline">
                      {getTypeText(alert.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {getSeverityIcon(alert.severity)}
                      <span className="ml-1 capitalize">{alert.severity}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-md">{alert.message}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-500" />
                      <div>
                        <div>{new Date(alert.date).toLocaleDateString('fr-FR')}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(alert.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {alert.isRead ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Lu
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700">
                        Non lu
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {!alert.isRead && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onMarkAsRead(alert.id)}
                      >
                        Marquer comme lu
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
