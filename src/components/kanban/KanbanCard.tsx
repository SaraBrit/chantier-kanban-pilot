
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

interface KanbanCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export const KanbanCard = ({ title, icon, children, className = "" }: KanbanCardProps) => {
  return (
    <Card className={`h-fit ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg font-semibold">
          {icon}
          <span className="ml-2">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
