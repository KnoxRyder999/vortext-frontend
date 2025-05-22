import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import SimpleAreaChart from "@/components/dashboard/SimpleAreaChart";
import StatCard from "@/components/dashboard/StatCard";
import { revenueData, usersData, activityItems } from "@/utils/constants";
import {
  ArrowUpRight,
  Users,
  CreditCard,
  LineChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link to="/">Back to VortexBytes Landing Page</Link>
        </Button>
      </div>

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

export default Index