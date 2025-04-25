
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, MapPin, Building, Users, Car, IndianRupee, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  employees: number;
  managers: string[];
  status: 'active' | 'inactive';
  contact: string;
  cabs: number;
  monthlyExpense: number;
}

const Branches = () => {
  const [filter, setFilter] = useState('');
  
  // Enhanced data for branches with Indian context
  const branches: Branch[] = [
    {
      id: 'branch-1',
      name: 'Delhi Headquarters',
      address: 'Cyber City, DLF Phase 2',
      city: 'Gurugram',
      state: 'Haryana',
      employees: 245,
      managers: ['Vikram Malhotra', 'Neha Sharma'],
      status: 'active',
      contact: '+91 11 4567 8900',
      cabs: 28,
      monthlyExpense: 580000
    },
    {
      id: 'branch-2',
      name: 'Mumbai Office',
      address: 'Bandra Kurla Complex',
      city: 'Mumbai',
      state: 'Maharashtra',
      employees: 178,
      managers: ['Rohit Mehta'],
      status: 'active',
      contact: '+91 22 2345 6789',
      cabs: 22,
      monthlyExpense: 520000
    },
    {
      id: 'branch-3',
      name: 'Bangalore Campus',
      address: 'Outer Ring Road, Marathahalli',
      city: 'Bangalore',
      state: 'Karnataka',
      employees: 210,
      managers: ['Anil Kumar', 'Priya Desai'],
      status: 'active',
      contact: '+91 80 4567 8901',
      cabs: 26,
      monthlyExpense: 540000
    },
    {
      id: 'branch-4',
      name: 'Chennai Office',
      address: 'Taramani IT Park',
      city: 'Chennai',
      state: 'Tamil Nadu',
      employees: 92,
      managers: ['Senthil Kumar'],
      status: 'active',
      contact: '+91 44 2876 5432',
      cabs: 14,
      monthlyExpense: 280000
    },
    {
      id: 'branch-5',
      name: 'Hyderabad Center',
      address: 'HITEC City, Madhapur',
      city: 'Hyderabad',
      state: 'Telangana',
      employees: 124,
      managers: ['Kiran Reddy', 'Lakshmi Nair'],
      status: 'active',
      contact: '+91 40 6789 0123',
      cabs: 18,
      monthlyExpense: 340000
    },
    {
      id: 'branch-6',
      name: 'Pune Office',
      address: 'Hinjewadi IT Park',
      city: 'Pune',
      state: 'Maharashtra',
      employees: 86,
      managers: ['Ajay Deshpande'],
      status: 'active',
      contact: '+91 20 5678 9012',
      cabs: 12,
      monthlyExpense: 240000
    },
    {
      id: 'branch-7',
      name: 'Kolkata Branch',
      address: 'Salt Lake Sector V',
      city: 'Kolkata',
      state: 'West Bengal',
      employees: 54,
      managers: ['Debashish Chatterjee'],
      status: 'inactive',
      contact: '+91 33 2345 6780',
      cabs: 8,
      monthlyExpense: 160000
    },
  ];
  
  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(filter.toLowerCase()) ||
    branch.city.toLowerCase().includes(filter.toLowerCase()) ||
    branch.state.toLowerCase().includes(filter.toLowerCase()) ||
    branch.address.toLowerCase().includes(filter.toLowerCase())
  );
  
  const activeBranches = filteredBranches.filter(branch => branch.status === 'active');
  const totalEmployees = branches.reduce((total, branch) => total + branch.employees, 0);
  const totalCabs = branches.reduce((total, branch) => total + branch.cabs, 0);
  const totalExpense = branches.reduce((total, branch) => total + branch.monthlyExpense, 0);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Branches</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Branch
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-primary opacity-70" />
              <div className="text-2xl font-bold">{branches.length}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {new Set(branches.map(b => b.state)).size} states
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary opacity-70" />
              <div className="text-2xl font-bold">{totalEmployees}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Avg. {Math.round(totalEmployees / branches.length)} per branch
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Cabs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Car className="h-5 w-5 mr-2 text-primary opacity-70" />
              <div className="text-2xl font-bold">{totalCabs}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Serving all branches 24/7
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Transport Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <IndianRupee className="h-5 w-5 mr-2 text-primary opacity-70" />
              <div className="text-2xl font-bold">{(totalExpense / 100000).toFixed(1)} Lakhs</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Avg. ₹{Math.round(totalExpense / totalEmployees)} per employee
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search branches..." 
            className="pl-9"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Branch Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Cabs</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBranches.map((branch) => (
                  <TableRow key={branch.id}>
                    <TableCell className="font-medium">{branch.name}</TableCell>
                    <TableCell>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <div>{branch.city}, {branch.state}</div>
                          <div className="text-xs text-muted-foreground">{branch.address}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{branch.employees}</TableCell>
                    <TableCell>{branch.cabs}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{branch.contact}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {branch.status === 'active' ? (
                        <Badge className="bg-cabit-success">Active</Badge>
                      ) : (
                        <Badge variant="outline">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Branches;
