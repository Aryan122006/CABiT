import { useState } from 'react';
import { Building, Calendar, Car, FileText, IndianRupee } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import TripStatusChart from '@/components/dashboard/TripStatusChart';
import TripRecentActivity from '@/components/dashboard/TripRecentActivity';
import DepartmentCostChart from '@/components/dashboard/DepartmentCostChart';
import BranchSelector from '@/components/dashboard/BranchSelector';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const [selectedBranchId, setSelectedBranchId] = useState('all');
  const { user } = useAuth();
  
  const branches = [
    { id: 'all', name: 'All Branches', location: 'Pan India' },
    { id: 'delhi', name: 'Delhi HQ', location: 'New Delhi' },
    { id: 'mumbai', name: 'Mumbai Branch', location: 'Mumbai' },
    { id: 'bangalore', name: 'Bangalore Tech Hub', location: 'Bangalore' },
    { id: 'hyderabad', name: 'Hyderabad Office', location: 'Hyderabad' },
    { id: 'chennai', name: 'Chennai Branch', location: 'Chennai' },
  ];
  
  const tripStatusData = [
    { name: 'Active', value: 15, color: '#25b003' },
    { name: 'Pending', value: 8, color: '#ffbf00' },
    { name: 'Completed', value: 42, color: '#1d5bb9' },
    { name: 'Cancelled', value: 5, color: '#e71d36' },
  ];
  
  const departmentCostData = [
    { department: 'HR', cost: 32000, color: '#1d5bb9' },
    { department: 'Engineering', cost: 51000, color: '#25b003' },
    { department: 'Sales', cost: 41000, color: '#ffbf00' },
    { department: 'Marketing', cost: 24000, color: '#e71d36' },
    { department: 'Finance', cost: 18000, color: '#9b59b6' },
  ];
  
  const recentActivities = [
    {
      id: '1',
      employeeName: 'Aryan Kumar',
      departmentName: 'Engineering',
      origin: 'Delhi HQ',
      destination: 'IGI Airport T3',
      time: '10:30 AM',
      date: 'Today',
      status: 'active' as const,
    },
    {
      id: '2',
      employeeName: 'Priya Sharma',
      departmentName: 'Marketing',
      origin: 'Mumbai Office',
      destination: 'Nariman Point',
      time: '09:15 AM',
      date: 'Today',
      status: 'completed' as const,
    },
    {
      id: '3',
      employeeName: 'Vikram Singh',
      departmentName: 'Sales',
      origin: 'Home',
      destination: 'Bangalore Office',
      time: '08:45 AM',
      date: 'Today',
      status: 'completed' as const,
    },
    {
      id: '4',
      employeeName: 'Ananya Patel',
      departmentName: 'HR',
      origin: 'Hotel Taj',
      destination: 'HICC Hyderabad',
      time: '01:30 PM',
      date: 'Today',
      status: 'pending' as const,
    },
    {
      id: '5',
      employeeName: 'Deepak Verma',
      departmentName: 'Finance',
      origin: 'Chennai Office',
      destination: 'T Nagar Meeting',
      time: '11:00 AM',
      date: 'Yesterday',
      status: 'cancelled' as const,
    }
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <BranchSelector 
            branches={branches}
            selectedBranchId={selectedBranchId}
            onSelect={setSelectedBranchId}
          />
          <Button asChild>
            <Link to="/bookings/new">
              <Calendar className="mr-2 h-4 w-4" /> Book a Cab
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Trips"
          value="15"
          description="Currently in progress"
          icon={<Car className="h-4 w-4" />}
          trend="up"
          trendValue="4 from yesterday"
        />
        <StatCard
          title="Today's Bookings"
          value="32"
          description="5 pending approval"
          icon={<Calendar className="h-4 w-4" />}
          trend="neutral"
          trendValue="Same as yesterday"
        />
        <StatCard
          title="Monthly Spend"
          value="₹2,45,000"
          description="April 2025"
          icon={<IndianRupee className="h-4 w-4" />}
          trend="down"
          trendValue="8% from last month"
        />
        <StatCard
          title="Active Branches"
          value="5"
          description="Pan India"
          icon={<Building className="h-4 w-4" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TripStatusChart data={tripStatusData} className="lg:col-span-1" />
        <DepartmentCostChart data={departmentCostData} className="lg:col-span-2" />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <TripRecentActivity activities={recentActivities} />
      </div>
    </div>
  );
};

export default Dashboard;
