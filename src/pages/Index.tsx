
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import SimpleAreaChart from "@/components/dashboard/SimpleAreaChart";
import StatCard from "@/components/dashboard/StatCard";
import { 
  ArrowUpRight, 
  Users, 
  CreditCard, 
  LineChart, 
  Activity 
} from "lucide-react";

const Index = () => {
  // Sample data for activity feed
  const activityItems = [
    {
      id: "1",
      title: "Monthly target reached",
      description: "You've hit your monthly revenue target",
      timestamp: "Just now",
      type: "achievement",
    },
    {
      id: "2",
      title: "New user sign up",
      description: "John Smith joined your platform",
      timestamp: "2 hours ago",
      type: "update",
    },
    {
      id: "3",
      title: "Payment received",
      description: "$299.00 from Business Pro subscription",
      timestamp: "6 hours ago",
      type: "info",
    },
    {
      id: "4",
      title: "Server maintenance",
      description: "Scheduled maintenance in 24 hours",
      timestamp: "1 day ago",
      type: "alert",
    },
  ];

  // Sample data for charts
  const revenueData = [
    { name: "Jan", value: 12400 },
    { name: "Feb", value: 14000 },
    { name: "Mar", value: 15600 },
    { name: "Apr", value: 17400 },
    { name: "May", value: 16800 },
    { name: "Jun", value: 19200 },
    { name: "Jul", value: 21600 },
  ];

  const usersData = [
    { name: "Jan", value: 120 },
    { name: "Feb", value: 160 },
    { name: "Mar", value: 210 },
    { name: "Apr", value: 290 },
    { name: "May", value: 350 },
    { name: "Jun", value: 430 },
    { name: "Jul", value: 510 },
  ];

  return (
    <DashboardLayout>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          description="Monthly revenue"
          icon={<LineChart />}
          trend={{ value: 20.1, isPositive: true }}
        />
        <StatCard
          title="Users"
          value="2,350"
          description="Active users this month"
          icon={<Users />}
          trend={{ value: 10.3, isPositive: true }}
        />
        <StatCard
          title="Conversions"
          value="3.6%"
          description="Average conversion rate"
          icon={<ArrowUpRight />}
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatCard
          title="MRR"
          value="$12,234"
          description="Monthly recurring revenue"
          icon={<CreditCard />}
          trend={{ value: 2.5, isPositive: false }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <SimpleAreaChart 
          title="Revenue" 
          data={revenueData}
          className="md:col-span-4"
        />
        <SimpleAreaChart 
          title="User Growth" 
          data={usersData}
          className="md:col-span-3"
        />
      </div>

      <div className="mt-6">
        <ActivityFeed items={activityItems} />
      </div>
    </DashboardLayout>
  );
};

export default Index;
