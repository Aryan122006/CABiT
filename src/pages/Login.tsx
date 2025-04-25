
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Car } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';

const userSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<'company' | 'employee'>('company');

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof userSchema>) => {
    // Check for company admin credentials
    if (activeTab === 'company' && 
        values.email === 'buygenie@buygenie.com' && 
        values.password === 'buygenie') {
      login({
        id: '1',
        email: values.email,
        name: 'BuyGenie India',
        role: 'admin',
        companyId: '1',
      });
      
      toast({
        title: 'Login Successful',
        description: 'Welcome back, BuyGenie India!',
      });
      
      navigate('/');
      return;
    }
    
    // Check for employee credentials
    if (activeTab === 'employee' && 
        values.email === 'aryan@buygenie.com' && 
        values.password === 'aryan') {
      login({
        id: '2',
        email: values.email,
        name: 'Aryan Kumar',
        role: 'employee',
        companyId: '1',
      });
      
      toast({
        title: 'Login Successful',
        description: 'Welcome back, Aryan Kumar!',
      });
      
      navigate('/');
      return;
    }
    
    // Show error if credentials don't match
    toast({
      variant: 'destructive',
      title: 'Login Failed',
      description: 'Invalid email or password. Please try again.',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <div className="w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="flex items-center gap-2 mb-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl">CABiT</span>
          </div>
          <h1 className="text-3xl font-bold">Welcome to CABiT</h1>
          <p className="text-muted-foreground mt-2">
            India's Premier Corporate Cab Management Solution
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Access your CABiT dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value as 'company' | 'employee')}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="company">Company Admin</TabsTrigger>
                <TabsTrigger value="employee">Employee</TabsTrigger>
              </TabsList>
              <TabsContent value="company">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="company@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">Sign In</Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="employee">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="employee@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">Sign In</Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              <span>Need help? Contact </span>
              <a href="mailto:support@cabit.in" className="text-primary hover:underline">
                support@cabit.in
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
