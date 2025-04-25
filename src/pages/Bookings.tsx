
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Search, Filter } from 'lucide-react';
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
}

const Bookings = () => {
  const [filter, setFilter] = useState('');
  
  // Mock data for bookings
  const bookings: BookingItem[] = [
    {
      id: 'booking-1',
      employeeName: 'Alex Johnson',
      department: 'Engineering',
      origin: 'HQ Office',
      destination: 'JFK Airport',
      date: '2025-04-25',
      time: '10:30 AM',
      status: 'scheduled',
      recurring: false,
    },
    {
      id: 'booking-2',
      employeeName: 'Sarah Williams',
      department: 'Marketing',
      origin: 'Boston Office',
      destination: 'Client Meeting',
      date: '2025-04-25',
      time: '09:15 AM',
      status: 'in-progress',
      recurring: false,
    },
    {
      id: 'booking-3',
      employeeName: 'Michael Brown',
      department: 'Sales',
      origin: 'Home',
      destination: 'SF Office',
      date: '2025-04-25',
      time: '08:45 AM',
      status: 'completed',
      recurring: true,
    },
    {
      id: 'booking-4',
      employeeName: 'Emily Davis',
      department: 'HR',
      origin: 'Hotel',
      destination: 'Conference Center',
      date: '2025-04-26',
      time: '01:30 PM',
      status: 'scheduled',
      recurring: false,
    },
    {
      id: 'booking-5',
      employeeName: 'Robert Wilson',
      department: 'Finance',
      origin: 'Miami Office',
      destination: 'Downtown Meeting',
      date: '2025-04-26',
      time: '11:00 AM',
      status: 'cancelled',
      recurring: false,
    },
    {
      id: 'booking-6',
      employeeName: 'Jennifer Lopez',
      department: 'Customer Support',
      origin: 'Home',
      destination: 'NYC Office',
      date: '2025-04-26',
      time: '09:00 AM',
      status: 'scheduled',
      recurring: true,
    },
  ];
  
  const filteredBookings = bookings.filter(booking =>
    booking.employeeName.toLowerCase().includes(filter.toLowerCase()) ||
    booking.department.toLowerCase().includes(filter.toLowerCase()) ||
    booking.origin.toLowerCase().includes(filter.toLowerCase()) ||
    booking.destination.toLowerCase().includes(filter.toLowerCase())
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
            <TableHead>Department</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Date & Time</TableHead>
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
                </TableCell>
                <TableCell>{booking.department}</TableCell>
                <TableCell>{booking.origin}</TableCell>
                <TableCell>{booking.destination}</TableCell>
                <TableCell>
                  <div>{new Date(booking.date).toLocaleDateString()}</div>
                  <div className="text-muted-foreground text-sm">{booking.time}</div>
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
        <Button asChild>
          <Link to="/bookings/new">
            <Plus className="mr-2 h-4 w-4" /> New Booking
          </Link>
        </Button>
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
