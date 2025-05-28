import { ActivityItem } from "./types";

export const activityItems: ActivityItem[] = [
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

export const usersData = [
  { name: "Jan", value: 120 },
  { name: "Feb", value: 160 },
  { name: "Mar", value: 210 },
  { name: "Apr", value: 290 },
  { name: "May", value: 350 },
  { name: "Jun", value: 430 },
  { name: "Jul", value: 510 },
];

export const revenueData = [
  { name: "Jan", value: 100 },
  { name: "Feb", value: 200 },
  { name: "Mar", value: 300 },
  { name: "Apr", value: 400 },
  { name: "May", value: 500 },
  { name: "Jun", value: 600 },
  { name: "Jul", value: 700 },
];

export const defaultProject = {
  name: 'VB Advanced Jobs System',
  description: 'A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.',
  category: 'SCRIPTS',
  client: 'MidwestRP',
  clientPublic: true,
  skills: ['QBCore', 'ESX Compatible', 'Lua', 'HTML/CSS/JS'],
  photos: ['vortex-1.png', 'vortex-2.png', 'vortex-3.png', 'vortex-4.png'],
  video: 'night-city-in-gta-5.1920x1080.mp4',
};

