
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: "1",
    content: "👋 नमस्ते! I'm CABiT Assistant. How can I help you with your corporate cab booking or management needs today?",
    isUser: false,
    timestamp: new Date(),
  },
];

// Enhanced responses for the chatbot with Indian context
const botResponses: Record<string, string> = {
  "booking": "To book a cab, go to the Bookings page and click on 'Book a Cab'. You'll need to provide pickup and drop location, date, time, and purpose of travel. We cover all major cities including Delhi NCR, Mumbai, Bangalore, Chennai, Hyderabad, Pune, and Kolkata.",
  "cancel": "To cancel a booking, go to the Bookings page, find your booking, and click on the cancel button. Please note that cancellations within 1 hour of pickup may incur charges as per our company policy.",
  "track": "You can track your current cab on the Tracking page. It shows real-time location of the cab, estimated arrival time, and driver details. Our tracking system works across all major Indian cities with precise GPS accuracy.",
  "driver": "Driver details are available on the Tracking page once your booking is confirmed. You'll see the driver's name, phone number, vehicle details, and ratings from other employees.",
  "report": "You can access various reports on the Reports page. This includes department-wise expenses, usage patterns, GST-compliant invoices, and monthly summaries for accounting purposes.",
  "payment": "Payments are handled through corporate accounts. Each ride is billed to your company and itemized in monthly statements with proper GST documentation for tax purposes.",
  "feedback": "After each ride, you'll receive a notification to provide feedback. Your inputs help us maintain our service standards and recognize our best drivers.",
  "support": "For any issues, please contact our support team at support@cabit.in or call our 24x7 helpline at +91 1800 123 4567.",
  "hello": "नमस्ते! How can I assist you with CABiT services today?",
  "hi": "नमस्ते! How can I help you with your corporate cab needs today?",
  "thanks": "You're welcome! Is there anything else I can help you with?",
  "thank you": "You're welcome! Is there anything else I can help you with?",
  "fare": "Our fares are competitive and transparent. For corporate accounts, we offer special packages based on your usage patterns. All fares include GST and can be viewed in detailed monthly reports.",
  "cities": "CABiT services are available in all major Indian cities including Delhi NCR, Mumbai, Bangalore, Chennai, Hyderabad, Pune, Kolkata, Ahmedabad, Jaipur, and Chandigarh.",
  "safety": "Safety is our priority. All our drivers undergo background verification, and vehicles are regularly inspected. We also provide real-time tracking and SOS features in our app for emergencies.",
  "covid": "We follow all COVID-19 safety protocols. Our cabs are regularly sanitized, drivers wear masks, and we maintain proper ventilation. We also offer contactless service options.",
  "female": "We have a special 'Women's Safety' program with verified female drivers available on request for female employees, especially for late-night travels.",
  "airport": "We provide specialized airport transfer services with flight tracking, so your cab is adjusted according to your flight's actual arrival time, even if there are delays.",
  "outstation": "For outstation trips, we offer both one-way and round-trip options with reliable drivers familiar with intercity routes. Packages include driver allowances and permits.",
  "billing": "Our billing is transparent with detailed GST-compliant invoices. You can set up cost centers, project codes, and employee-wise billing as per your company's requirements.",
  "peak": "During peak hours in metropolitan cities like Delhi and Mumbai, we recommend booking 30 minutes in advance to ensure timely pickup.",
  "toll": "All toll charges are included in your final bill with proper documentation for reimbursement purposes.",
  "gst": "We provide GST-compliant invoices for all your rides. Your company's GST details can be added to your profile for automatic inclusion in all invoices.",
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const response = getBotResponse(input.trim().toLowerCase());
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };
  
  const getBotResponse = (userInput: string): string => {
    // Check for keywords in the input and return appropriate responses
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (userInput.includes(keyword)) {
        return response;
      }
    }
    
    // Default response if no keywords match
    return "I'm not sure how to help with that specific query. For booking assistance, tracking information, or support across our Indian operations, please ask about those topics or contact our support team at support@cabit.in or call +91 1800 123 4567.";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  
  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
      
      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] shadow-lg animate-fade-in z-50">
          <CardHeader className="px-4 py-3 flex flex-row items-center justify-between bg-primary text-primary-foreground">
            <CardTitle className="text-base font-medium">CABiT Assistant</CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-primary-foreground hover:bg-primary/50" 
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <div className="relative flex flex-col flex-1">
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 h-[370px]">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.isUser ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                        message.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg px-3 py-2 text-sm bg-muted flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Typing...
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <CardFooter className="p-3 border-t">
              <div className="flex w-full items-center gap-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </div>
        </Card>
      )}
    </>
  );
}

export default Chatbot;
