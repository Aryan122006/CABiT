
import { useState } from 'react';
import { Building, Calendar, Car, FileText } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import TripStatusChart from '@/components/dashboard/TripStatusChart';
import TripRecentActivity from '@/components/dashboard/TripRecentActivity';
import DepartmentCostChart from '@/components/dashboard/DepartmentCostChart';
import BranchSelector from '@/components/dashboard/BranchSelector';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [selectedBranchId, setSelectedBranchId] = useState('all');
  
  // Mock data for branches
  const branches = [
    { id: 'all', name: 'All Branches', location: 'Global' },
    { id: 'hq', name: 'Headquarters', location: 'New York' },
    { id: 'west', name: 'West Branch', location: 'San Francisco' },
    { id: 'east', name: 'East Branch', location: 'Boston' },
    { id: 'south', name: 'South Branch', location: 'Miami' },
  ];
  
  // Mock data for trip status chart
  const tripStatusData = [
    { name: 'Active', value: 15, color: '#25b003' },
    { name: 'Pending', value: 8, color: '#ffbf00' },
    { name: 'Completed', value: 42, color: '#1d5bb9' },
    { name: 'Cancelled', value: 5, color: '#e71d36' },
  ];
  
  // Mock data for department cost chart
  const departmentCostData = [
    { department: 'HR', cost: 3200, color: '#1d5bb9' },
    { department: 'Engineering', cost: 5100, color: '#25b003' },
    { department: 'Sales', cost: 4100, color: '#ffbf00' },
    { department: 'Marketing', cost: 2400, color: '#e71d36' },
    { department: 'Finance', cost: 1800, color: '#9b59b6' },
  ];
  
  // Mock data for recent activity - converted to non-readonly array
  const recentActivities = [
    {
      id: '1',
      employeeName: 'Alex Johnson',
      departmentName: 'Engineering',
      origin: 'HQ Office',
      destination: 'JFK Airport',
      time: '10:30 AM',
      date: 'Today',
      status: 'active',
    },
    {
      id: '2',
      employeeName: 'Sarah Williams',
      departmentName: 'Marketing',
      origin: 'Boston Office',
      destination: 'Client Meeting',
      time: '09:15 AM',
      date: 'Today',
      status: 'completed',
    },
    {
      id: '3',
      employeeName: 'Michael Brown',
      departmentName: 'Sales',
      origin: 'Home',
      destination: 'SF Office',
      time: '08:45 AM',
      date: 'Today',
      status: 'completed',
    },
    {
      id: '4',
      employeeName: 'Emily Davis',
      departmentName: 'HR',
      origin: 'Hotel',
      destination: 'Conference Center',
      time: '01:30 PM',
      date: 'Today',
      status: 'pending',
    },
    {
      id: '5',
      employeeName: 'Robert Wilson',
      departmentName: 'Finance',
      origin: 'Miami Office',
      destination: 'Downtown Meeting',
      time: '11:00 AM',
      date: 'Yesterday',
      status: 'cancelled',
    }
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
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
          value="$24,500"
          description="April 2025"
          icon={<FileText className="h-4 w-4" />}
          trend="down"
          trendValue="8% from last month"
        />
        <StatCard
          title="Active Branches"
          value="4"
          description="All regions"
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
