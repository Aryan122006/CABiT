
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileDown, Filter, Calendar } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import DepartmentCostChart from '@/components/dashboard/DepartmentCostChart';

const Reports = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock data for department cost chart
  const departmentCostData = [
    { department: 'HR', cost: 3200, color: '#1d5bb9' },
    { department: 'Engineering', cost: 5100, color: '#25b003' },
    { department: 'Sales', cost: 4100, color: '#ffbf00' },
    { department: 'Marketing', cost: 2400, color: '#e71d36' },
    { department: 'Finance', cost: 1800, color: '#9b59b6' },
    { department: 'Operations', cost: 2900, color: '#3498db' },
    { department: 'Legal', cost: 1200, color: '#e67e22' },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports</h1>
        <Button>
          <FileDown className="mr-2 h-4 w-4" /> Export Data
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="space-y-2">
          <Label>Report Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left",
                  !date && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "MMMM yyyy") : "Select month"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                captionLayout="dropdown-buttons"
                fromYear={2023}
                toYear={2025}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="branch">Branch</Label>
          <Select>
            <SelectTrigger className="w-[180px]" id="branch">
              <SelectValue placeholder="All Branches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="hq">Headquarters</SelectItem>
              <SelectItem value="west">West Branch</SelectItem>
              <SelectItem value="east">East Branch</SelectItem>
              <SelectItem value="south">South Branch</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" className="mt-auto">
          <Filter className="mr-2 h-4 w-4" /> More Filters
        </Button>
      </div>
      
      <Tabs defaultValue="cost" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-3">
          <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
          <TabsTrigger value="usage">Usage Metrics</TabsTrigger>
          <TabsTrigger value="feedback">Feedback Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cost" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Spend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$21,300</div>
                <p className="text-sm text-muted-foreground mt-1">April 2025</p>
                <div className="text-sm text-cabit-success mt-2">
                  ↑ 8% from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Average Trip Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$48.50</div>
                <p className="text-sm text-muted-foreground mt-1">April 2025</p>
                <div className="text-sm text-cabit-danger mt-2">
                  ↓ 3% from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Department</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">Engineering</div>
                <p className="text-sm text-muted-foreground mt-1">$5,100 spent</p>
                <div className="text-sm text-muted-foreground mt-2">
                  24% of total budget
                </div>
              </CardContent>
            </Card>
          </div>
          
          <DepartmentCostChart data={departmentCostData} />
          
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown by Trip Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Office Commute</p>
                    <p className="text-sm text-muted-foreground">Daily employee transportation</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$12,450</p>
                    <p className="text-sm text-muted-foreground">58% of total</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Airport Transfers</p>
                    <p className="text-sm text-muted-foreground">Business travel</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$5,320</p>
                    <p className="text-sm text-muted-foreground">25% of total</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Client Meetings</p>
                    <p className="text-sm text-muted-foreground">Sales and partnerships</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$2,880</p>
                    <p className="text-sm text-muted-foreground">14% of total</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Other</p>
                    <p className="text-sm text-muted-foreground">Miscellaneous travel</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$650</p>
                    <p className="text-sm text-muted-foreground">3% of total</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="usage" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Select filters to generate usage reports.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Select filters to generate feedback reports.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
