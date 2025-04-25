
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
import { Search, Plus, MapPin, Building, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  employees: number;
  managers: string[];
  status: 'active' | 'inactive';
}

const Branches = () => {
  const [filter, setFilter] = useState('');
  
  // Mock data for branches
  const branches: Branch[] = [
    {
      id: 'branch-1',
      name: 'Headquarters',
      address: '350 5th Ave, New York, NY 10118',
      city: 'New York',
      country: 'USA',
      employees: 245,
      managers: ['John Smith', 'Sarah Johnson'],
      status: 'active',
    },
    {
      id: 'branch-2',
      name: 'West Coast Office',
      address: 'One Market Street, San Francisco, CA 94105',
      city: 'San Francisco',
      country: 'USA',
      employees: 128,
      managers: ['Michael Chen'],
      status: 'active',
    },
    {
      id: 'branch-3',
      name: 'Boston Office',
      address: '100 Federal Street, Boston, MA 02110',
      city: 'Boston',
      country: 'USA',
      employees: 86,
      managers: ['Emily Davis'],
      status: 'active',
    },
    {
      id: 'branch-4',
      name: 'Miami Office',
      address: '600 Brickell Ave, Miami, FL 33131',
      city: 'Miami',
      country: 'USA',
      employees: 54,
      managers: ['Robert Wilson'],
      status: 'inactive',
    },
  ];
  
  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(filter.toLowerCase()) ||
    branch.city.toLowerCase().includes(filter.toLowerCase()) ||
    branch.address.toLowerCase().includes(filter.toLowerCase())
  );
  
  const activeBranches = filteredBranches.filter(branch => branch.status === 'active');
  const totalEmployees = branches.reduce((total, branch) => total + branch.employees, 0);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Branches</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Branch
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-primary opacity-70" />
              <div className="text-2xl font-bold">{branches.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Branches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-cabit-success" />
              <div className="text-2xl font-bold">{activeBranches.length}</div>
            </div>
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
                  <TableHead>Branch Managers</TableHead>
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
                          <div>{branch.city}, {branch.country}</div>
                          <div className="text-xs text-muted-foreground">{branch.address}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{branch.employees}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {branch.managers.map((manager, index) => (
                          <div key={index} className="text-sm">{manager}</div>
                        ))}
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
