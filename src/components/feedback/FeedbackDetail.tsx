
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/StarRating";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Check, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Feedback {
  id: number;
  employeeName: string;
  tripId: string;
  rating: number;
  feedback: string;
  date: string;
  status: string;
}

interface FeedbackDetailProps {
  feedback: Feedback;
  onClose: () => void;
}

const FeedbackDetail = ({ feedback, onClose }: FeedbackDetailProps) => {
  const [response, setResponse] = useState("");
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  
  const handleSubmitResponse = () => {
    if (!response.trim()) {
      toast({
        variant: "destructive",
        title: "Response required",
        description: "Please enter a response before submitting."
      });
      return;
    }
    
    // Here you would normally submit to an API
    toast({
      title: "Response submitted",
      description: "Your response has been submitted successfully."
    });
    
    onClose();
  };
  
  const handleEscalate = () => {
    toast({
      title: "Feedback escalated",
      description: "This feedback has been escalated to management."
    });
    
    onClose();
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Feedback Details</CardTitle>
            <CardDescription>Trip ID: {feedback.tripId}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="text-sm font-medium">Employee</div>
          <div>{feedback.employeeName}</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm font-medium">Rating</div>
          <StarRating value={feedback.rating} readOnly />
        </div>
        
        <div className="space-y-1">
          <div className="text-sm font-medium">Date</div>
          <div>{feedback.date}</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm font-medium">Status</div>
          <Badge 
            variant={
              feedback.status === 'reviewed' ? 'default' : 
              feedback.status === 'pending' ? 'outline' : 
              'destructive'
            }
          >
            {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
          </Badge>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm font-medium">Feedback</div>
          <div className="p-3 bg-muted rounded-md">{feedback.feedback}</div>
        </div>
        
        {isAdmin && feedback.status === "pending" && (
          <div className="space-y-1">
            <div className="text-sm font-medium">Response</div>
            <Textarea 
              placeholder="Enter your response to this feedback..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            />
          </div>
        )}
      </CardContent>
      
      {isAdmin && feedback.status === "pending" && (
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleEscalate}>
            Escalate
          </Button>
          <Button onClick={handleSubmitResponse}>
            <Check className="mr-2 h-4 w-4" />
            Submit Response
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default FeedbackDetail;
