
import { Project } from "@/types/project";
import { KanbanCard } from "./KanbanCard";
import { BarChart3, Calendar, TrendingUp } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

interface ChartsCardProps {
  project: Project;
}

export const ChartsCard = ({ project }: ChartsCardProps) => {
  // Données pour les graphiques
  const budgetData = [
    { name: 'Planifié', value: project.budget, fill: '#3B82F6' },
    { name: 'Dépensé', value: project.spent, fill: '#10B981' },
    { name: 'Restant', value: project.budget - project.spent, fill: '#F59E0B' }
  ];

  const progressData = [
    { month: 'Jan', planned: 10, actual: 8 },
    { month: 'Fév', planned: 20, actual: 18 },
    { month: 'Mar', planned: 35, actual: 30 },
    { month: 'Avr', planned: 50, actual: 45 },
    { month: 'Mai', planned: 65, actual: 55 },
    { month: 'Juin', planned: 80, actual: project.progress }
  ];

  const taskStatusData = [
    { name: 'Terminées', value: 35, fill: '#10B981' },
    { name: 'En cours', value: 45, fill: '#3B82F6' },
    { name: 'À faire', value: 20, fill: '#F59E0B' }
  ];

  const chartConfig = {
    planned: {
      label: "Planifié",
      color: "#3B82F6",
    },
    actual: {
      label: "Réel",
      color: "#10B981",
    },
  };

  return (
    <KanbanCard title="Graphiques & Analyses" icon={<BarChart3 className="h-5 w-5 text-purple-600" />}>
      <div className="space-y-6">
        {/* Graphique Budget */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            Répartition Budget
          </h4>
          <div className="h-32">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>

        {/* Graphique Avancement */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Avancement vs Planifié
          </h4>
          <div className="h-32">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="planned" stroke="#3B82F6" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>

        {/* Graphique Statut Tâches */}
        <div>
          <h4 className="text-sm font-medium mb-2">Statut des Tâches</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={50}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 text-xs mt-2">
            {taskStatusData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: item.fill }}></div>
                <span>{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </KanbanCard>
  );
};
