
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  BarChart3, 
  Home, 
  Settings, 
  Users, 
  PieChart,
  ArrowUpRight,
  TrendingUp,
  Activity,
  CreditCard
} from "lucide-react";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebarIfMobile = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-muted/10">
      {/* Backdrop for mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40" 
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed md:relative inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out",
          isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"
        )}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <div className="flex items-center">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-dashboard-purple to-dashboard-purple-dark flex items-center justify-center">
              <span className="text-white font-semibold text-sm">D</span>
            </div>
            <span className="ml-2 font-semibold">Dashboard</span>
          </div>
          {isMobile && (
            <button onClick={toggleSidebar} className="text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>

        {/* Sidebar content */}
        <div className="py-4 space-y-1 px-2">
          <Link 
            to="/"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-primary/10 text-primary"
            onClick={closeSidebarIfMobile}
          >
            <Home className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
          <Link 
            to="#"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={closeSidebarIfMobile}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Link>
          <Link 
            to="#"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={closeSidebarIfMobile}
          >
            <Users className="h-4 w-4 mr-2" />
            Customers
          </Link>
          <Link 
            to="#"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={closeSidebarIfMobile}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </Link>
          <Link 
            to="#"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={closeSidebarIfMobile}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="h-16 flex items-center justify-between bg-background border-b px-4">
          {isMobile && (
            <button onClick={toggleSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          <div className={cn(isMobile ? "mx-auto" : "invisible")}>
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-dashboard-purple to-dashboard-purple-dark flex items-center justify-center">
              <span className="text-white font-semibold text-sm">D</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm font-medium">JD</span>
          </div>
        </header>
        
        {/* Content area */}
        <main className="flex-1 overflow-y-auto py-6 px-4 md:px-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <DashboardHeader username="John" />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
