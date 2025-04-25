
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface BookingFormProps {
  onSubmit: (data: any) => void;
  className?: string;
}

const BookingForm = ({ onSubmit, className }: BookingFormProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isRecurring, setIsRecurring] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
    const formData = {
      // Collect form data
    };
    onSubmit(formData);
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Book a Cab</CardTitle>
        <CardDescription>Schedule a ride for your commute or a business trip</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tripType">Trip Type</Label>
            <Select>
              <SelectTrigger id="tripType">
                <SelectValue placeholder="Select trip type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="office">Office Commute</SelectItem>
                <SelectItem value="airport">Airport Transfer</SelectItem>
                <SelectItem value="meeting">Business Meeting</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pickup">Pickup Location</Label>
            <Input id="pickup" placeholder="Enter pickup address" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input id="destination" placeholder="Enter destination address" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="relative">
                <Input 
                  id="time" 
                  type="time" 
                  className="pl-9" 
                />
                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="passengers">Number of Passengers</Label>
            <div className="relative">
              <Input 
                id="passengers" 
                type="number" 
                min="1"
                max="8"
                defaultValue="1" 
                className="pl-9" 
              />
              <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="recurring" 
              checked={isRecurring}
              onCheckedChange={(checked) => {
                setIsRecurring(checked === true);
              }}
            />
            <Label htmlFor="recurring">Make this a recurring booking</Label>
          </div>
          
          {isRecurring && (
            <div className="space-y-2 pl-6 border-l-2 border-muted">
              <Label htmlFor="recurrence">Recurrence Pattern</Label>
              <Select>
                <SelectTrigger id="recurrence">
                  <SelectValue placeholder="Select recurrence pattern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Every weekday (Mon-Fri)</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit}>Book Ride</Button>
      </CardFooter>
    </Card>
  );
};

export default BookingForm;
