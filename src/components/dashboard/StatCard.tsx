
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className="text-primary opacity-70">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && trendValue && (
          <div className="flex items-center mt-1">
            {trend === 'up' ? (
              <span className="text-cabit-success text-xs mr-1">↑</span>
            ) : trend === 'down' ? (
              <span className="text-cabit-danger text-xs mr-1">↓</span>
            ) : (
              <span className="text-muted-foreground text-xs mr-1">→</span>
            )}
            <span className={cn(
              "text-xs",
              trend === 'up' && "text-cabit-success",
              trend === 'down' && "text-cabit-danger",
              trend === 'neutral' && "text-muted-foreground"
            )}>
              {trendValue}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
