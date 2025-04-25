
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LiveTracking from '@/components/tracking/LiveTracking';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { Phone, MapPin, Clock, AlertTriangle } from 'lucide-react';

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
  driverPhone?: string;
  emergencyContact?: string;
}

const Tracking = () => {
  const { user } = useAuth();
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  
  // Mock data for active trips with Indian context
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
      pickupLocation: 'Cyber City, Gurugram, Delhi NCR',
      dropLocation: 'Terminal 3, IGI Airport, New Delhi',
      startTime: '10:30 AM',
      passengers: 1,
      progress: 65,
      driverPhone: '+91 98765 43210',
      emergencyContact: '1800-123-4567'
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
      pickupLocation: 'Nehru Place, Delhi',
      dropLocation: 'Sector 29, Gurugram, Haryana',
      startTime: '11:15 AM',
      passengers: 2,
      progress: 10,
      driverPhone: '+91 87654 32109',
      emergencyContact: '1800-123-4567'
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
      pickupLocation: 'Sector 62, Noida, Uttar Pradesh',
      dropLocation: 'Cyber City, Gurugram, Delhi NCR',
      startTime: '09:45 AM',
      passengers: 1,
      progress: 80,
      driverPhone: '+91 76543 21098',
      emergencyContact: '1800-123-4567'
    },
    {
      id: 'trip-4',
      driver: 'Mohit Sharma',
      vehicle: 'HR 26 AB 3456 - Maruti Ertiga',
      employee: 'Neha Gupta',
      origin: 'Gurugram Metro',
      destination: 'Delhi Airport',
      status: 'In Progress',
      eta: '18 min',
      coordinates: { lat: 28.4595, lng: 77.0266 },
      pickupLocation: 'HUDA City Centre, Gurugram, Haryana',
      dropLocation: 'Terminal 1D, IGI Airport, New Delhi',
      startTime: '11:05 AM',
      passengers: 3,
      progress: 40,
      driverPhone: '+91 65432 10987',
      emergencyContact: '1800-123-4567'
    }
  ];

  const selectedTrip = selectedTripId 
    ? activeTrips.find(trip => trip.id === selectedTripId) 
    : activeTrips[0];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Live Tracking</h1>
          <p className="text-muted-foreground">Monitor active trips in real-time across India</p>
        </div>
        <ThemeToggle />
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
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {trip.origin} → {trip.destination}
                    </div>
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
                  <div className="flex justify-between">
                    <div>{selectedTrip.driver}</div>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 px-2">
                      <Phone className="h-3 w-3" /> Call
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Vehicle</div>
                  <div>{selectedTrip.vehicle}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Status</div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cabit-success"></span>
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
                <div className="space-y-2">
                  <div className="text-sm font-medium">Start Time</div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {selectedTrip.startTime}
                  </div>
                </div>
                <div className="pt-3 mt-3 border-t">
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-cabit-danger" />
                    Emergency Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2 h-[600px]">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Live Map</CardTitle>
              <CardDescription>Real-time tracking of ride location</CardDescription>
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
