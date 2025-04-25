
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

// Define interfaces to match the Tracking.tsx expected structure
interface TripInfo {
  id: string;
  driver: string;
  vehicle: string;
  employee: string;
  origin: string;
  destination: string;
  status: string;
  eta: string;
  coordinates: { lat: number; lng: number };
  pickupLocation: string;
  dropLocation: string;
  startTime: string;
  passengers: number;
  progress: number;
}

interface LiveTrackingProps {
  tripInfo: TripInfo;
  className?: string;
}

const LiveTracking = ({ tripInfo, className }: LiveTrackingProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // This would be replaced with actual map implementation
  useEffect(() => {
    if (mapContainerRef.current) {
      // Simulating map loading
      setTimeout(() => {
        setIsMapLoaded(true);
      }, 1000);
    }
  }, []);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'In Progress':
      case 'active':
        return 'bg-cabit-success';
      case 'Starting':
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

  // Get driver info from the string format in tripInfo.driver
  const driverName = tripInfo?.driver || '';
  const driverInitials = driverName ? driverName.substring(0, 2) : '';

  // Extract vehicle details
  const vehicleDetails = tripInfo?.vehicle?.split(' - ') || [];
  const vehicleNumber = vehicleDetails[0] || '';
  const vehicleModel = vehicleDetails[1] || '';

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Live Tracking</CardTitle>
          <Badge className={getStatusBadgeClass(tripInfo.status)}>
            {tripInfo.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-64 w-full relative bg-muted" ref={mapContainerRef}>
          {!isMapLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-muted-foreground">Loading map...</span>
            </div>
          ) : (
            <div className="absolute inset-0 bg-slate-100">
              {/* Map placeholder with simulated route */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 overflow-hidden">
                <svg width="600" height="600" viewBox="0 0 600 600">
                  <path
                    d="M100,300 C150,150 450,150 500,300"
                    stroke="black"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="10 5"
                  />
                  <circle cx="100" cy="300" r="10" fill="green" />
                  <circle cx="500" cy="300" r="10" fill="red" />
                  
                  {/* Car icon at the trip progress position */}
                  <circle 
                    cx={100 + (400 * (tripInfo.progress / 100))} 
                    cy={300 - Math.sin(Math.PI * (tripInfo.progress / 100)) * 150} 
                    r="12" 
                    fill="#0b3d91"
                    className="animate-pulse-light"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm font-medium">Trip Progress</p>
              <div className="flex items-center gap-3">
                <Progress value={tripInfo.progress} className="h-2" />
                <span className="text-sm font-medium">{tripInfo.progress}%</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Pickup</p>
              <p className="text-sm font-medium truncate">{tripInfo.pickupLocation}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Drop-off</p>
              <p className="text-sm font-medium truncate">{tripInfo.dropLocation}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Start Time</p>
              <p className="text-sm font-medium">{tripInfo.startTime}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">ETA</p>
              <p className="text-sm font-medium">{tripInfo.eta}</p>
            </div>
          </div>
          
          <div className="flex items-center pt-2 border-t">
            <Avatar className="h-10 w-10 border">
              <AvatarFallback>{driverInitials}</AvatarFallback>
            </Avatar>
            <div className="ml-3 space-y-0.5">
              <p className="text-sm font-medium">{driverName}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span>★</span> 4.8 • {vehicleModel} • {vehicleNumber}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveTracking;
