
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
import { Search, MoreVertical, Plus, FileDown, UserPlus } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';

// Mock employee data
const employeesData = [
  { id: 1, name: "Raj Kumar", department: "Engineering", email: "raj.kumar@techcorp.in", phone: "+91 98765 43210", status: "active" },
  { id: 2, name: "Priya Sharma", department: "Marketing", email: "priya.sharma@techcorp.in", phone: "+91 87654 32109", status: "active" },
  { id: 3, name: "Vikram Singh", department: "Finance", email: "vikram.singh@techcorp.in", phone: "+91 76543 21098", status: "active" },
  { id: 4, name: "Ananya Patel", department: "HR", email: "ananya.patel@techcorp.in", phone: "+91 65432 10987", status: "inactive" },
  { id: 5, name: "Deepak Verma", department: "Operations", email: "deepak.verma@techcorp.in", phone: "+91 54321 09876", status: "active" },
  { id: 6, name: "Neha Gupta", department: "Sales", email: "neha.gupta@techcorp.in", phone: "+91 43210 98765", status: "active" },
  { id: 7, name: "Amit Joshi", department: "Engineering", email: "amit.joshi@techcorp.in", phone: "+91 32109 87654", status: "inactive" },
  { id: 8, name: "Kavita Das", department: "Customer Support", email: "kavita.das@techcorp.in", phone: "+91 21098 76543", status: "active" },
];

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { user } = useAuth();
  
  const filteredEmployees = employeesData.filter(employee => 
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase())
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
          {user?.role === 'admin' && (
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>
            Manage employees and their cab booking permissions
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
                        <DropdownMenuItem>Edit employee</DropdownMenuItem>
                        <DropdownMenuItem>View bookings</DropdownMenuItem>
                        {employee.status === 'active' ? (
                          <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>Activate</DropdownMenuItem>
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
