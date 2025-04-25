
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, Plus, FileDown, UserPlus, MapPin, Building, IndianRupee, Phone } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

// Enhanced employee data with Indian context
const employeesData = [
  { id: 1, name: "Raj Kumar", department: "Engineering", email: "raj.kumar@techcorp.in", phone: "+91 98765 43210", location: "Delhi NCR", status: "active" },
  { id: 2, name: "Priya Sharma", department: "Marketing", email: "priya.sharma@techcorp.in", phone: "+91 87654 32109", location: "Mumbai", status: "active" },
  { id: 3, name: "Vikram Singh", department: "Finance", email: "vikram.singh@techcorp.in", phone: "+91 76543 21098", location: "Bangalore", status: "active" },
  { id: 4, name: "Ananya Patel", department: "HR", email: "ananya.patel@techcorp.in", phone: "+91 65432 10987", location: "Hyderabad", status: "inactive" },
  { id: 5, name: "Deepak Verma", department: "Operations", email: "deepak.verma@techcorp.in", phone: "+91 54321 09876", location: "Chennai", status: "active" },
  { id: 6, name: "Neha Gupta", department: "Sales", email: "neha.gupta@techcorp.in", phone: "+91 43210 98765", location: "Pune", status: "active" },
  { id: 7, name: "Amit Joshi", department: "Engineering", email: "amit.joshi@techcorp.in", phone: "+91 32109 87654", location: "Kolkata", status: "inactive" },
  { id: 8, name: "Kavita Das", department: "Customer Support", email: "kavita.das@techcorp.in", phone: "+91 21098 76543", location: "Delhi NCR", status: "active" },
  { id: 9, name: "Sanjay Mehta", department: "Engineering", email: "sanjay.mehta@techcorp.in", phone: "+91 11098 76543", location: "Mumbai", status: "active" },
  { id: 10, name: "Ritu Kapoor", department: "Finance", email: "ritu.kapoor@techcorp.in", phone: "+91 21098 16543", location: "Bangalore", status: "active" },
];

const departmentStats = {
  "Engineering": { count: 3, monthlyCabExpense: 42000 },
  "Marketing": { count: 1, monthlyCabExpense: 18000 },
  "Finance": { count: 2, monthlyCabExpense: 24000 },
  "HR": { count: 1, monthlyCabExpense: 15000 },
  "Operations": { count: 1, monthlyCabExpense: 22000 },
  "Sales": { count: 1, monthlyCabExpense: 26000 },
  "Customer Support": { count: 1, monthlyCabExpense: 19000 }
};

const locationStats = {
  "Delhi NCR": { count: 2, avgTripTime: 48 },
  "Mumbai": { count: 2, avgTripTime: 52 },
  "Bangalore": { count: 2, avgTripTime: 45 },
  "Hyderabad": { count: 1, avgTripTime: 40 },
  "Chennai": { count: 1, avgTripTime: 38 },
  "Pune": { count: 1, avgTripTime: 36 },
  "Kolkata": { count: 1, avgTripTime: 42 }
};

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const filteredEmployees = employeesData.filter(employee => 
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employees</h1>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Print list</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isAdmin && (
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          )}
        </div>
      </div>

      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employeesData.length}</div>
              <p className="text-xs text-muted-foreground">
                Active: {employeesData.filter(e => e.status === "active").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(departmentStats).length}</div>
              <p className="text-xs text-muted-foreground">
                Most staffed: Engineering
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(locationStats).length}</div>
              <p className="text-xs text-muted-foreground">
                Across major Indian cities
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Monthly Cab Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <IndianRupee className="h-5 w-5 mr-1" />
                {Object.values(departmentStats).reduce((sum, dept) => sum + dept.monthlyCabExpense, 0).toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-muted-foreground">
                Avg. ₹20,750 per department
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>
            {isAdmin 
              ? "Manage employees and their cab booking permissions" 
              : "View employee contact information"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Phone</TableHead>
                {isAdmin && <TableHead>Location</TableHead>}
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell className="hidden md:table-cell">{employee.email}</TableCell>
                  <TableCell className="hidden lg:table-cell">{employee.phone}</TableCell>
                  {isAdmin && (
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {employee.location}
                      </div>
                    </TableCell>
                  )}
                  <TableCell>
                    <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                      {employee.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        {isAdmin && <DropdownMenuItem>Edit employee</DropdownMenuItem>}
                        <DropdownMenuItem>View bookings</DropdownMenuItem>
                        {isAdmin && employee.status === 'active' ? (
                          <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                        ) : isAdmin && (
                          <DropdownMenuItem>Activate</DropdownMenuItem>
                        )}
                        {!isAdmin && (
                          <DropdownMenuItem asChild>
                            <Link to="/bookings/new">Book cab</Link>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Employees;
