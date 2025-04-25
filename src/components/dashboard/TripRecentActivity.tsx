
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TripActivityProps {
  id: string;
  employeeName: string;
  departmentName: string;
  origin: string;
  destination: string;
  time: string;
  date: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
}

interface TripRecentActivityProps {
  activities: TripActivityProps[];
  className?: string;
}

const TripRecentActivity = ({ activities, className }: TripRecentActivityProps) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-cabit-success';
      case 'pending':
        return 'bg-cabit-warning text-black';
      case 'completed':
        return 'bg-muted';
      case 'cancelled':
        return 'bg-cabit-danger';
      default:
        return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Recent Trip Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex flex-1 flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{activity.employeeName}</span>
                  <span className="text-xs text-muted-foreground">{activity.departmentName}</span>
                </div>
                <div className="text-sm text-muted-foreground truncate">
                  {activity.origin} → {activity.destination}
                </div>
                <div className="text-xs text-muted-foreground">
                  {activity.date} • {activity.time}
                </div>
              </div>
              <Badge className={getStatusBadgeClass(activity.status)}>
                {getStatusText(activity.status)}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TripRecentActivity;
