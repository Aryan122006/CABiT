
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

export function AppSidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const mainMenuItems = [
    { title: "Dashboard", path: "/", icon: ChartBar },
    { title: "Bookings", path: "/bookings", icon: Calendar },
    { title: "Tracking", path: "/tracking", icon: Car },
    { title: "Reports", path: "/reports", icon: FileText },
    { title: "Branches", path: "/branches", icon: Building },
    { title: "Employees", path: "/employees", icon: Users },
    { title: "Feedback", path: "/feedback", icon: MessageSquare },
  ];
  
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="flex justify-center items-center py-4">
        <div className="flex items-center gap-2 px-2">
          <Car className="h-6 w-6 text-sidebar-foreground" />
          <span className="font-bold text-xl text-sidebar-foreground">CABiT</span>
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
          <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-sidebar-accent">
            <div className="flex-shrink-0 h-8 w-8 bg-sidebar-primary rounded-full flex items-center justify-center text-sidebar-primary-foreground">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-accent-foreground truncate">
                Admin User
              </p>
              <p className="text-xs text-sidebar-accent-foreground/70 truncate">
                admin@cabit.com
              </p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
