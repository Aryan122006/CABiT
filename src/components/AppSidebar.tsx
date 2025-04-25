
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { 
  Building, 
  Calendar, 
  ChartBar, 
  FileText, 
  Car, 
  MessageSquare, 
  Users, 
  Settings
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import UserMenu from './UserMenu';

export function AppSidebar() {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const mainMenuItems = [
    { title: "Dashboard", path: "/", icon: ChartBar },
    { title: "Bookings", path: "/bookings", icon: Calendar },
    { title: "Tracking", path: "/tracking", icon: Car },
    { title: "Reports", path: "/reports", icon: FileText },
    { title: "Branches", path: "/branches", icon: Building },
  ];
  
  // Add items that depend on user role
  if (user?.role === 'admin') {
    mainMenuItems.push({ title: "Employees", path: "/employees", icon: Users });
  }
  
  mainMenuItems.push({ title: "Feedback", path: "/feedback", icon: MessageSquare });
  
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="flex justify-center items-center py-4">
        <div className="flex items-center gap-2 px-2">
          <Car className="h-6 w-6 text-sidebar-foreground" />
          <span className="font-bold text-xl text-sidebar-foreground">CABiT</span>
          <span className="text-xs bg-primary text-primary-foreground px-1 rounded">India</span>
        </div>
        <SidebarTrigger className="absolute right-2 top-4 md:hidden" />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={isActive(item.path) ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                  >
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/settings" className="flex items-center gap-3">
                <Settings size={18} />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        <div className="p-3 mt-2">
          <UserMenu />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
