
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LiveTracking from '@/components/tracking/LiveTracking';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

// Define the TripInfo type with all required properties
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

const Tracking = () => {
  const { user } = useAuth();
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  
  // Mock data for active trips
  const activeTrips: TripInfo[] = [
    {
      id: 'trip-1',
      driver: 'Rakesh Singh',
      vehicle: 'DL 01 AB 1234 - Swift Dzire',
      employee: 'Aryan Kumar',
      origin: 'Delhi HQ',
      destination: 'IGI Airport T3',
      status: 'In Progress',
      eta: '15 min',
      coordinates: { lat: 28.6139, lng: 77.2090 },
      pickupLocation: 'Delhi HQ, Connaught Place',
      dropLocation: 'IGI Airport Terminal 3, New Delhi',
      startTime: '10:30 AM',
      passengers: 1,
      progress: 65
    },
    {
      id: 'trip-2',
      driver: 'Vijay Kumar',
      vehicle: 'DL 02 CD 5678 - Innova Crysta',
      employee: 'Deepak Verma',
      origin: 'Delhi Office',
      destination: 'Gurgaon Sector 29',
      status: 'Starting',
      eta: '25 min',
      coordinates: { lat: 28.5355, lng: 77.2410 },
      pickupLocation: 'Delhi Office, Nehru Place',
      dropLocation: 'Sector 29, Gurgaon',
      startTime: '11:15 AM',
      passengers: 2,
      progress: 10
    },
    {
      id: 'trip-3',
      driver: 'Amit Patel',
      vehicle: 'DL 03 EF 9012 - Honda City',
      employee: 'Priya Sharma',
      origin: 'Noida Office',
      destination: 'Delhi HQ',
      status: 'In Progress',
      eta: '10 min',
      coordinates: { lat: 28.5700, lng: 77.3200 },
      pickupLocation: 'Noida Office, Sector 62',
      dropLocation: 'Delhi HQ, Connaught Place',
      startTime: '09:45 AM',
      passengers: 1,
      progress: 80
    }
  ];

  const selectedTrip = selectedTripId 
    ? activeTrips.find(trip => trip.id === selectedTripId) 
    : activeTrips[0];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Live Tracking</h1>
        <p className="text-muted-foreground">Monitor active trips in real-time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Trips</CardTitle>
              <CardDescription>Select a trip to view details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {activeTrips.map((trip) => (
                <Button
                  key={trip.id}
                  variant={selectedTrip?.id === trip.id ? "default" : "outline"}
                  className="w-full justify-start text-left"
                  onClick={() => setSelectedTripId(trip.id)}
                >
                  <div>
                    <div className="font-medium">{trip.employee}</div>
                    <div className="text-sm text-muted-foreground">{trip.origin} → {trip.destination}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {selectedTrip && (
            <Card>
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Employee</div>
                  <div>{selectedTrip.employee}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Driver</div>
                  <div>{selectedTrip.driver}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Vehicle</div>
                  <div>{selectedTrip.vehicle}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Status</div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    {selectedTrip.status} (ETA: {selectedTrip.eta})
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Origin</div>
                  <div>{selectedTrip.pickupLocation}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Destination</div>
                  <div>{selectedTrip.dropLocation}</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2 h-[600px]">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Live Map</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-5rem)]">
              {selectedTrip && <LiveTracking tripInfo={selectedTrip} />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
