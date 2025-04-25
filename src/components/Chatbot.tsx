
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
    content: "👋 Hi there! I'm CABiT Assistant. How can I help you with your cab booking or management needs today?",
    isUser: false,
    timestamp: new Date(),
  },
];

// Predefined responses for the chatbot
const botResponses: Record<string, string> = {
  "booking": "To book a cab, go to the Bookings page and click on 'Book a Cab'. You'll need to provide pickup and drop location, date, time, and purpose of travel.",
  "cancel": "To cancel a booking, go to the Bookings page, find your booking, and click on the cancel button. Please note that cancellations within 1 hour of pickup may incur charges.",
  "track": "You can track your current cab on the Tracking page. It shows real-time location of the cab, estimated arrival time, and driver details.",
  "driver": "Driver details are available on the Tracking page once your booking is confirmed. You'll see the driver's name, phone number, and vehicle details.",
  "report": "You can access various reports on the Reports page. This includes department-wise expenses, usage patterns, and monthly summaries.",
  "payment": "Payments are handled through corporate accounts. Each ride is billed to your company and itemized in monthly statements.",
  "feedback": "After each ride, you'll receive a notification to provide feedback. You can also go to the Feedback page to submit or view your past feedback.",
  "support": "For any issues, please contact our support team at support@cabit.in or call our helpline at +91 1800 123 4567.",
  "hello": "Hello! How can I assist you with CABiT services today?",
  "hi": "Hi there! How can I help you with your corporate cab needs?",
  "thanks": "You're welcome! Is there anything else I can help you with?",
  "thank you": "You're welcome! Is there anything else I can help you with?",
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
    return "I'm not sure how to help with that specific query. For booking assistance, tracking information, or support, please ask about those topics or contact our support team at support@cabit.in.";
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
