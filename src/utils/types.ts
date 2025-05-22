export type ActivityItem = {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    type: "alert" | "update" | "achievement" | "info";
};

