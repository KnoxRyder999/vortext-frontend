
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Confetti from "../Confetti";

interface DashboardHeaderProps {
  username: string;
}

const DashboardHeader = ({ username }: DashboardHeaderProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {username}!</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your dashboard today.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={triggerConfetti} 
          className="relative group"
        >
          <span className="absolute inset-0 translate-x-1 translate-y-1 bg-dashboard-purple-dark rounded-lg group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-200"></span>
          <span className="block relative bg-dashboard-purple px-4 py-2 rounded-lg border border-dashboard-purple-dark z-10">
            Celebrate
          </span>
        </Button>
      </div>
      <Confetti isActive={showConfetti} />
    </div>
  );
};

export default DashboardHeader;
