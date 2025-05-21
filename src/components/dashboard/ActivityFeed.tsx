
import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "alert" | "update" | "achievement" | "info";
};

interface ActivityFeedProps {
  items: ActivityItem[];
}

export default function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Activity Feed</CardTitle>
        <Activity className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div
                className={`mt-0.5 h-2 w-2 rounded-full ${getActivityTypeColor(
                  item.type
                )}`}
              />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.timestamp}
                </p>
              </div>
              <Separator className="my-4" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function getActivityTypeColor(type: ActivityItem["type"]) {
  switch (type) {
    case "alert":
      return "bg-destructive";
    case "update":
      return "bg-blue-500";
    case "achievement":
      return "bg-green-500";
    case "info":
    default:
      return "bg-muted-foreground";
  }
}
