
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "update" | "achievement" | "alert" | "info";
}

interface ActivityFeedProps {
  items: ActivityItem[];
  className?: string;
}

const ActivityFeed = ({ items, className }: ActivityFeedProps) => {
  const getTypeStyles = (type: ActivityItem["type"]) => {
    switch (type) {
      case "update":
        return "bg-dashboard-soft-blue";
      case "achievement":
        return "bg-dashboard-soft-green";
      case "alert":
        return "bg-dashboard-soft-orange";
      case "info":
        return "bg-dashboard-soft-purple";
      default:
        return "bg-dashboard-soft-blue";
    }
  };

  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader>
        <CardTitle className="text-lg">Activity Feed</CardTitle>
        <CardDescription>Your recent activity</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start px-4 py-3 border-b last:border-0"
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full mt-1.5 mr-3",
                  getTypeStyles(item.type)
                )}
              />
              <div className="flex-1 space-y-0.5">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
                <p className="text-xs text-muted-foreground">{item.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
