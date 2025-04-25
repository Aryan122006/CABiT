
import { useState } from 'react';
import LiveTracking from '@/components/tracking/LiveTracking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, RefreshCw } from 'lucide-react';

const Tracking = () => {
  const [activeTrips, setActiveTrips] = useState([
    {
      id: 'trip-1',
      status: 'active',
      pickupLocation: '350 5th Ave, New York, NY 10118',
      dropLocation: 'JFK Airport, Queens, NY 11430',
      startTime: '10:30 AM',
      eta: '11:25 AM',
      passengers: 1,
      progress: 40,
      driver: {
        id: 'driver-1',
        name: 'John Smith',
        phone: '+1 555-123-4567',
        photo: '',
        rating: 4.8,
        vehicleNumber: 'NYC 5678',
        vehicleModel: 'Toyota Camry'
      }
    },
    {
      id: 'trip-2',
      status: 'active',
      pickupLocation: 'One Market Street, San Francisco, CA 94105',
      dropLocation: 'SFO Airport, San Francisco, CA 94128',
      startTime: '09:45 AM',
      eta: '10:30 AM',
      passengers: 2,
      progress: 75,
      driver: {
        id: 'driver-2',
        name: 'Maria Garcia',
        phone: '+1 555-987-6543',
        photo: '',
        rating: 4.9,
        vehicleNumber: 'CA 12345',
        vehicleModel: 'Honda Accord'
      }
    }
  ] as const);
  
  const [pendingTrips, setPendingTrips] = useState([
    {
      id: 'trip-3',
      status: 'pending',
      pickupLocation: '200 E Randolph St, Chicago, IL 60601',
      dropLocation: "O'Hare Airport, Chicago, IL 60666",
      startTime: '01:15 PM',
      eta: '02:00 PM',
      passengers: 3,
      progress: 0,
      driver: {
        id: 'driver-3',
        name: 'David Johnson',
        phone: '+1 555-456-7890',
        photo: '',
        rating: 4.7,
        vehicleNumber: 'IL 67890',
        vehicleModel: 'Ford Fusion'
      }
    }
  ] as const);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Live Tracking</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search trips..." 
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-3">
          <TabsTrigger value="active">Active ({activeTrips.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingTrips.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-6">
          {activeTrips.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-12">
                <p className="text-muted-foreground mb-4">No active trips found</p>
                <Button variant="outline">Refresh</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeTrips.map(trip => (
                <LiveTracking key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pendingTrips.map(trip => (
              <LiveTracking key={trip.id} trip={trip} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Select a date range to view completed trips.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tracking;
