
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Search, Filter, IndianRupee, MapPin, Car, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

interface BookingItem {
  id: string;
  employeeName: string;
  department: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  recurring: boolean;
  cabType: string;
  fare: number;
  distance: number;
  driverName?: string;
  vehicleNo?: string;
}

const Bookings = () => {
  const [filter, setFilter] = useState('');
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  // Mock data for bookings with Indian context
  const bookings: BookingItem[] = [
    {
      id: 'booking-1',
      employeeName: 'Rahul Sharma',
      department: 'Engineering',
      origin: 'Cyber City, Gurugram',
      destination: 'IGI Airport Terminal 3',
      date: '2025-04-25',
      time: '10:30 AM',
      status: 'scheduled',
      recurring: false,
      cabType: 'Sedan',
      fare: 850,
      distance: 18.5,
      driverName: 'Manoj Kumar',
      vehicleNo: 'DL 01 AB 1234'
    },
    {
      id: 'booking-2',
      employeeName: 'Priya Patel',
      department: 'Marketing',
      origin: 'BKC, Mumbai',
      destination: 'Nariman Point',
      date: '2025-04-25',
      time: '09:15 AM',
      status: 'in-progress',
      recurring: false,
      cabType: 'Premium Sedan',
      fare: 750,
      distance: 12.3,
      driverName: 'Suresh Shah',
      vehicleNo: 'MH 02 CD 5678'
    },
    {
      id: 'booking-3',
      employeeName: 'Vikram Malhotra',
      department: 'Sales',
      origin: 'Whitefield, Bangalore',
      destination: 'Electronic City',
      date: '2025-04-25',
      time: '08:45 AM',
      status: 'completed',
      recurring: true,
      cabType: 'SUV',
      fare: 950,
      distance: 22.1,
      driverName: 'Ravi Naik',
      vehicleNo: 'KA 03 EF 9012'
    },
    {
      id: 'booking-4',
      employeeName: 'Anjali Desai',
      department: 'HR',
      origin: 'Madhapur, Hyderabad',
      destination: 'Rajiv Gandhi Airport',
      date: '2025-04-26',
      time: '01:30 PM',
      status: 'scheduled',
      recurring: false,
      cabType: 'Sedan',
      fare: 780,
      distance: 16.8,
      driverName: 'Ramesh Reddy',
      vehicleNo: 'TS 04 GH 3456'
    },
    {
      id: 'booking-5',
      employeeName: 'Anil Kumar',
      department: 'Finance',
      origin: 'T Nagar, Chennai',
      destination: 'Chennai Airport',
      date: '2025-04-26',
      time: '11:00 AM',
      status: 'cancelled',
      recurring: false,
      cabType: 'Hatchback',
      fare: 650,
      distance: 14.2
    },
    {
      id: 'booking-6',
      employeeName: 'Divya Singh',
      department: 'Customer Support',
      origin: 'Koramangala, Bangalore',
      destination: 'Indiranagar',
      date: '2025-04-26',
      time: '09:00 AM',
      status: 'scheduled',
      recurring: true,
      cabType: 'Mini',
      fare: 450,
      distance: 8.5,
      driverName: 'Venkat Swamy',
      vehicleNo: 'KA 05 IJ 7890'
    },
    {
      id: 'booking-7',
      employeeName: 'Nikhil Verma',
      department: 'Engineering',
      origin: 'Powai, Mumbai',
      destination: 'Worli Sea Face',
      date: '2025-04-27',
      time: '10:00 AM',
      status: 'scheduled',
      recurring: false,
      cabType: 'Sedan',
      fare: 720,
      distance: 15.3,
      driverName: 'Pawan Mistry',
      vehicleNo: 'MH 06 KL 2345'
    },
  ];
  
  const filteredBookings = bookings.filter(booking =>
    booking.employeeName.toLowerCase().includes(filter.toLowerCase()) ||
    booking.department.toLowerCase().includes(filter.toLowerCase()) ||
    booking.origin.toLowerCase().includes(filter.toLowerCase()) ||
    booking.destination.toLowerCase().includes(filter.toLowerCase()) ||
    booking.cabType.toLowerCase().includes(filter.toLowerCase())
  );
  
  const scheduledBookings = filteredBookings.filter(booking => booking.status === 'scheduled');
  const inProgressBookings = filteredBookings.filter(booking => booking.status === 'in-progress');
  const completedBookings = filteredBookings.filter(booking => booking.status === 'completed');
  const cancelledBookings = filteredBookings.filter(booking => booking.status === 'cancelled');
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-cabit-warning text-cabit-dark">Scheduled</Badge>;
      case 'in-progress':
        return <Badge className="bg-cabit-success">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-cabit-danger">Cancelled</Badge>;
      default:
        return null;
    }
  };
  
  const BookingsTable = ({ bookings }: { bookings: BookingItem[] }) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Origin → Destination</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Cab Type</TableHead>
            <TableHead>Fare</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No bookings found
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">
                  {booking.employeeName}
                  {booking.recurring && (
                    <span className="ml-2">
                      <Calendar className="h-3 w-3 inline text-muted-foreground" />
                    </span>
                  )}
                  <div className="text-xs text-muted-foreground">{booking.department}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-cabit-success flex-shrink-0" />
                    <span className="text-sm">{booking.origin}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3 text-cabit-danger flex-shrink-0" />
                    <span className="text-sm">{booking.destination}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {booking.distance} km
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span>{booking.time}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Car className="h-3 w-3 text-primary" />
                    <span>{booking.cabType}</span>
                  </div>
                  {booking.driverName && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Driver: {booking.driverName}
                    </div>
                  )}
                  {booking.vehicleNo && (
                    <div className="text-xs text-muted-foreground">
                      {booking.vehicleNo}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3 text-muted-foreground" />
                    <span>{booking.fare}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/bookings/${booking.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bookings</h1>
        {(isAdmin || user?.role === 'employee') && (
          <Button asChild>
            <Link to="/bookings/new">
              <Plus className="mr-2 h-4 w-4" /> New Booking
            </Link>
          </Button>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search bookings..." 
            className="pl-9"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex-shrink-0">
          <Filter className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-5">
          <TabsTrigger value="all">All ({filteredBookings.length})</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled ({scheduledBookings.length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({inProgressBookings.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedBookings.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <BookingsTable bookings={filteredBookings} />
        </TabsContent>
        
        <TabsContent value="scheduled" className="mt-6">
          <BookingsTable bookings={scheduledBookings} />
        </TabsContent>
        
        <TabsContent value="in-progress" className="mt-6">
          <BookingsTable bookings={inProgressBookings} />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <BookingsTable bookings={completedBookings} />
        </TabsContent>
        
        <TabsContent value="cancelled" className="mt-6">
          <BookingsTable bookings={cancelledBookings} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bookings;
