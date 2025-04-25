
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StarRating } from "@/components/StarRating";
import { Search, MapPin, Calendar, Phone, IndianRupee } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import FeedbackDetail from '@/components/feedback/FeedbackDetail';
import { ThemeToggle } from '@/components/ThemeToggle';

// Enhanced feedback data with Indian context
const feedbackData = [
  { 
    id: 1, 
    employeeName: "Raj Kumar", 
    tripId: "TRIP-001", 
    rating: 5, 
    feedback: "Driver was excellent and punctual. Very comfortable journey from office to airport.", 
    date: "2025-04-23", 
    status: "reviewed",
    route: "Cyber City, Gurugram to IGI Airport T3",
    driverName: "Mohan Singh",
    vehicleType: "Sedan - Swift Dzire",
    vehicleNo: "DL 01 AB 1234",
    tripCost: 850
  },
  { 
    id: 2, 
    employeeName: "Priya Sharma", 
    tripId: "TRIP-002", 
    rating: 4, 
    feedback: "Good service, but driver was slightly late for pickup. AC was working well though it was very hot in Delhi.", 
    date: "2025-04-22", 
    status: "pending",
    route: "Connaught Place, Delhi to Noida Sector 62",
    driverName: "Vijay Kumar",
    vehicleType: "Premium Sedan - Honda City",
    vehicleNo: "DL 02 CD 5678",
    tripCost: 720
  },
  { 
    id: 3, 
    employeeName: "Vikram Singh", 
    tripId: "TRIP-003", 
    rating: 5, 
    feedback: "Really happy with the service. Driver navigated through Mumbai traffic very efficiently. Will book again.", 
    date: "2025-04-22", 
    status: "reviewed",
    route: "BKC Mumbai to Nariman Point",
    driverName: "Suresh Patil",
    vehicleType: "Sedan - Swift Dzire",
    vehicleNo: "MH 01 EF 9012",
    tripCost: 650
  },
  { 
    id: 4, 
    employeeName: "Ananya Patel", 
    tripId: "TRIP-004", 
    rating: 3, 
    feedback: "AC was not working properly during the journey. It was uncomfortable in the Bangalore afternoon heat.", 
    date: "2025-04-21", 
    status: "pending",
    route: "Whitefield to Electronic City, Bangalore",
    driverName: "Ravi Gowda",
    vehicleType: "Sedan - Swift Dzire",
    vehicleNo: "KA 03 GH 3456",
    tripCost: 920
  },
  { 
    id: 5, 
    employeeName: "Deepak Verma", 
    tripId: "TRIP-005", 
    rating: 4, 
    feedback: "Driver was polite and helpful. Helped with luggage at both Chennai airport and hotel.", 
    date: "2025-04-20", 
    status: "reviewed",
    route: "Chennai Airport to T Nagar",
    driverName: "Senthil Kumar",
    vehicleType: "SUV - Innova Crysta",
    vehicleNo: "TN 04 IJ 7890",
    tripCost: 950
  },
  { 
    id: 6, 
    employeeName: "Neha Gupta", 
    tripId: "TRIP-006", 
    rating: 2, 
    feedback: "Driver was rude and cab was not clean. The seats had stains and the driver was talking on phone while driving in Hyderabad traffic.", 
    date: "2025-04-19", 
    status: "escalated",
    route: "Hitech City to Hyderabad Airport",
    driverName: "Ramesh Reddy",
    vehicleType: "Sedan - Swift Dzire",
    vehicleNo: "TS 05 KL 1234",
    tripCost: 780
  },
  { 
    id: 7, 
    employeeName: "Amit Joshi", 
    tripId: "TRIP-007", 
    rating: 5, 
    feedback: "Excellent service as always. Driver was waiting at Pune airport with my name card, and the ride to Hinjewadi was smooth.", 
    date: "2025-04-18", 
    status: "reviewed",
    route: "Pune Airport to Hinjewadi IT Park",
    driverName: "Prakash Deshmukh",
    vehicleType: "Premium Sedan - Honda City",
    vehicleNo: "MH 12 MN 5678",
    tripCost: 820
  },
  { 
    id: 8, 
    employeeName: "Kavita Das", 
    tripId: "TRIP-008", 
    rating: 4, 
    feedback: "Good experience overall. AC was working fine and driver was polite. Navigated through Kolkata traffic well.", 
    date: "2025-04-18", 
    status: "pending",
    route: "Salt Lake to Kolkata Airport",
    driverName: "Debashish Chatterjee",
    vehicleType: "Sedan - Swift Dzire",
    vehicleNo: "WB 06 OP 9012",
    tripCost: 680
  },
];

const Feedback = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<typeof feedbackData[0] | null>(null);
  const { user } = useAuth();
  
  const filteredFeedback = feedbackData.filter(item => {
    // Filter by search query
    const matchesSearch = 
      item.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tripId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.feedback.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.driverName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by tab
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pending') return matchesSearch && item.status === 'pending';
    if (activeTab === 'escalated') return matchesSearch && item.status === 'escalated';
    if (activeTab === 'reviewed') return matchesSearch && item.status === 'reviewed';
    
    return matchesSearch;
  });
  
  // For employee view, only show their own feedback
  const isEmployee = user?.role === 'employee';
  const displayFeedback = isEmployee 
    ? filteredFeedback.filter(item => item.employeeName === user?.name)
    : filteredFeedback;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Feedback</h1>
          <p className="text-muted-foreground">Review and manage cab service feedback</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search feedback..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ThemeToggle />
        </div>
      </div>

      <Tabs 
        defaultValue="all" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="all">All Feedback</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="escalated">Escalated</TabsTrigger>
          <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Feedback Submissions</CardTitle>
                <CardDescription>
                  {isEmployee 
                    ? "Your feedback on recent cab bookings" 
                    : "Employee feedback on recent cab bookings"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trip Details</TableHead>
                      {!isEmployee && <TableHead>Employee</TableHead>}
                      <TableHead>Rating</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Cost</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayFeedback.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={isEmployee ? 6 : 7} className="text-center py-8 text-muted-foreground">
                          No feedback found
                        </TableCell>
                      </TableRow>
                    ) : (
                      displayFeedback.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="font-medium">{item.tripId}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" /> {item.route}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Calendar className="h-3 w-3" /> {item.date}
                            </div>
                          </TableCell>
                          {!isEmployee && <TableCell>{item.employeeName}</TableCell>}
                          <TableCell>
                            <StarRating value={item.rating} readOnly />
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{item.driverName}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {item.vehicleType}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                item.status === 'reviewed' ? 'default' : 
                                item.status === 'pending' ? 'outline' : 
                                'destructive'
                              }
                            >
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              <IndianRupee className="h-3 w-3 text-muted-foreground" />
                              <span>{item.tripCost}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedFeedback(item)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {selectedFeedback && (
              <FeedbackDetail 
                feedback={selectedFeedback} 
                onClose={() => setSelectedFeedback(null)}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Feedback;
