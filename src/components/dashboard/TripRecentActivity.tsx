
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface TripActivityProps {
  id: string;
  employeeName: string;
  departmentName: string;
  origin: string;
  destination: string;
  time: string;
  date: string;
  status: "active" | "completed" | "pending" | "cancelled";
}

interface TripRecentActivityProps {
  activities: TripActivityProps[];
  className?: string;
}

const TripRecentActivity = ({ activities, className }: TripRecentActivityProps) => {
  const getStatusColor = (status: TripActivityProps["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "completed":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest cab bookings and trip status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className={cn("w-2 h-2 rounded-full mt-2 mr-3", getStatusColor(activity.status))} />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    <span>{activity.employeeName}</span>
                    <span className="mx-1.5 text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{activity.departmentName}</span>
                  </p>
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize",
                      activity.status === "active" && "bg-green-50 text-green-700 border-green-300",
                      activity.status === "completed" && "bg-blue-50 text-blue-700 border-blue-300",
                      activity.status === "pending" && "bg-yellow-50 text-yellow-700 border-yellow-300",
                      activity.status === "cancelled" && "bg-red-50 text-red-700 border-red-300"
                    )}
                  >
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm">
                  {activity.origin} <span className="mx-1.5">→</span> {activity.destination}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.time}, {activity.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TripRecentActivity;
