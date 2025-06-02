
import { Alert } from "@/types/project";
import { KanbanCard } from "./KanbanCard";
import { MessageSquare, AlertTriangle, Info, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AlertsCardProps {
  alerts: Alert[];
  onMarkAsRead: (alertId: string) => void;
}

export const AlertsCard = ({ alerts, onMarkAsRead }: AlertsCardProps) => {
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
      case 'info': return <Info className="h-3 w-3" />;
      case 'warning': return <AlertTriangle className="h-3 w-3" />;
      case 'error': return <AlertTriangle className="h-3 w-3" />;
      default: return <Info className="h-3 w-3" />;
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

  const unreadAlerts = alerts.filter(alert => !alert.isRead);

  return (
    <KanbanCard 
      title={`Messages d'Alertes ${unreadAlerts.length > 0 ? `(${unreadAlerts.length})` : ''}`}
      icon={<MessageSquare className="h-5 w-5 text-red-600" />}
    >
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <Info className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">Aucune alerte active</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`border rounded-lg p-3 ${alert.isRead ? 'bg-gray-50' : 'bg-white border-l-4 border-l-red-500'}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge className={getSeverityColor(alert.severity)}>
                    {getSeverityIcon(alert.severity)}
                    <span className="ml-1">{getTypeText(alert.type)}</span>
                  </Badge>
                  {!alert.isRead && (
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </div>
                {!alert.isRead && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onMarkAsRead(alert.id)}
                    className="p-1 h-6 w-6"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              
              <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
              
              <div className="text-xs text-gray-500">
                {new Date(alert.date).toLocaleDateString('fr-FR')} à {new Date(alert.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))
        )}
      </div>
    </KanbanCard>
  );
};
