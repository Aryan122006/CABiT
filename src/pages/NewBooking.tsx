
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '@/components/booking/BookingForm';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';

const NewBooking = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (data: any) => {
    // Submit logic would go here
    console.log('Booking submitted:', data);
    
    // Show success toast
    toast({
      title: "Booking Created",
      description: "Your cab has been booked successfully.",
    });
    
    // Navigate back to bookings list
    setTimeout(() => {
      navigate('/bookings');
    }, 1500);
  };
  
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/bookings')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">New Booking</h1>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <BookingForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default NewBooking;
