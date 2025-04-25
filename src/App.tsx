
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { AuthProvider } from "./hooks/useAuth";
import PrivateRoute from "./components/PrivateRoute";
import Chatbot from "./components/Chatbot";
import { ThemeProvider } from "./hooks/useTheme";

// Pages
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import NewBooking from "./pages/NewBooking";
import Tracking from "./pages/Tracking";
import Reports from "./pages/Reports";
import Branches from "./pages/Branches";
import Employees from "./pages/Employees";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public route */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route path="bookings/new" element={<NewBooking />} />
                  <Route path="tracking" element={<Tracking />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="branches" element={<Branches />} />
                  <Route path="employees" element={<Employees />} />
                  <Route path="feedback" element={<Feedback />} />
                </Route>
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            <Chatbot />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
