
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
import { Search } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import FeedbackDetail from '@/components/feedback/FeedbackDetail';

// Mock feedback data
const feedbackData = [
  { id: 1, employeeName: "Raj Kumar", tripId: "TRIP-001", rating: 5, feedback: "Driver was excellent and punctual. Very comfortable journey.", date: "2025-04-23", status: "reviewed" },
  { id: 2, employeeName: "Priya Sharma", tripId: "TRIP-002", rating: 4, feedback: "Good service, but driver was slightly late.", date: "2025-04-22", status: "pending" },
  { id: 3, employeeName: "Vikram Singh", tripId: "TRIP-003", rating: 5, feedback: "Really happy with the service. Will book again.", date: "2025-04-22", status: "reviewed" },
  { id: 4, employeeName: "Ananya Patel", tripId: "TRIP-004", rating: 3, feedback: "AC was not working properly during the journey.", date: "2025-04-21", status: "pending" },
  { id: 5, employeeName: "Deepak Verma", tripId: "TRIP-005", rating: 4, feedback: "Driver was polite and helpful.", date: "2025-04-20", status: "reviewed" },
  { id: 6, employeeName: "Neha Gupta", tripId: "TRIP-006", rating: 2, feedback: "Driver was rude and cab was not clean.", date: "2025-04-19", status: "escalated" },
  { id: 7, employeeName: "Amit Joshi", tripId: "TRIP-007", rating: 5, feedback: "Excellent service as always.", date: "2025-04-18", status: "reviewed" },
  { id: 8, employeeName: "Kavita Das", tripId: "TRIP-008", rating: 4, feedback: "Good experience overall.", date: "2025-04-18", status: "pending" },
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
      item.feedback.toLowerCase().includes(searchQuery.toLowerCase());
    
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
        <h1 className="text-3xl font-bold">Feedback</h1>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search feedback..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
                      <TableHead>Trip ID</TableHead>
                      {!isEmployee && <TableHead>Employee</TableHead>}
                      <TableHead>Rating</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayFeedback.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={isEmployee ? 4 : 5} className="text-center py-8 text-muted-foreground">
                          No feedback found
                        </TableCell>
                      </TableRow>
                    ) : (
                      displayFeedback.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.tripId}</TableCell>
                          {!isEmployee && <TableCell>{item.employeeName}</TableCell>}
                          <TableCell>
                            <StarRating value={item.rating} readOnly />
                          </TableCell>
                          <TableCell>{item.date}</TableCell>
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
