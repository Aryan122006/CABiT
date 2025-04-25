
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LiveTracking from '@/components/tracking/LiveTracking';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const mockActiveTrips = [
  {
    id: "1",
    driver: "Rajan Sharma",
    vehicle: "Swift Dzire - DL 01 AB 1234",
    employee: "Alex Johnson",
    origin: "Office HQ",
    destination: "Airport Terminal 3",
    status: "In Progress",
    eta: "15 mins",
    coordinates: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: "2", 
    driver: "Mohit Kumar",
    vehicle: "Toyota Innova - DL 02 CD 5678",
    employee: "Sarah Williams",
    origin: "Office East Branch",
    destination: "Client Meeting - Connaught Place",
    status: "Pickup Soon",
    eta: "5 mins",
    coordinates: { lat: 28.6304, lng: 77.2177 }
  },
  {
    id: "3",
    driver: "Vikram Singh",
    vehicle: "Honda City - DL 03 EF 9012",
    employee: "Michael Brown",
    origin: "Office South Branch", 
    destination: "Residential Complex - Gurgaon",
    status: "In Progress",
    eta: "25 mins",
    coordinates: { lat: 28.4595, lng: 77.0266 }
  }
];

const Tracking = () => {
  const [selectedTrip, setSelectedTrip] = useState(mockActiveTrips[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<string>("map");
  
  // Filter trips based on search query
  const filteredTrips = mockActiveTrips.filter(trip => 
    trip.employee.toLowerCase().includes(searchQuery.toLowerCase()) || 
    trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Live Tracking</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search trips..."
              className="pl-8 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs
            value={viewMode}
            onValueChange={setViewMode}
            className="w-[250px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Active Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTrips.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No trips found matching your search
                </div>
              ) : (
                filteredTrips.map((trip) => (
                  <div 
                    key={trip.id}
                    onClick={() => setSelectedTrip(trip)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedTrip.id === trip.id 
                        ? "bg-primary/10 border-primary" 
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium truncate">{trip.employee}</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded">
                        ETA: {trip.eta}
                      </span>
                    </div>
                    <div className="text-sm mb-1 truncate">
                      <span className="text-muted-foreground">To: </span>
                      {trip.destination}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {trip.vehicle}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <Tabs 
          value={viewMode} 
          className="lg:col-span-2"
        >
          <TabsContent value="map" className="mt-0">
            <Card className="h-[500px]">
              <CardContent className="p-0">
                <LiveTracking trip={selectedTrip} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="list" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">{selectedTrip.employee}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-muted-foreground">From:</span>
                          <p className="text-sm font-medium">{selectedTrip.origin}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">To:</span>
                          <p className="text-sm font-medium">{selectedTrip.destination}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">ETA:</span>
                          <p className="text-sm font-medium">{selectedTrip.eta}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-muted-foreground">Driver:</span>
                          <p className="text-sm font-medium">{selectedTrip.driver}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Vehicle:</span>
                          <p className="text-sm font-medium">{selectedTrip.vehicle}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Status:</span>
                          <p className="text-sm font-medium">{selectedTrip.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      Contact Driver
                    </Button>
                    <Button className="flex-1">
                      Send ETA Update
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Tracking;
