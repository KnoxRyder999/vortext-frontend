
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Confetti from "@/components/Confetti";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  id: string;
  setActiveSection: (section: string) => void;
}

const HeroSection = ({ id, setActiveSection }: HeroSectionProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-20"></div>
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2021/09/07/07/11/game-6603193_1280.jpg')",
          }}
        ></div>
      </div>

      <Confetti isActive={showConfetti} />

      <div className="container px-4 mx-auto z-30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-green-400">
              Premium FiveM Scripts & Mods
            </span>
            <br />
            <span className="text-white">Built for Serious RP Servers</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Elevate your GTA V roleplaying experience with custom-built,
            high-performance scripts and mods.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              onClick={() => scrollToSection("portfolio")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg flex items-center"
            >
              View Portfolio <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="border-purple-500 text-purple-500 hover:bg-purple-900/20 px-8 py-6 text-lg"
            >
              Custom Work
            </Button>
            <Button
              onClick={triggerConfetti}
              variant="secondary"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            >
              Join Discord
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {["QBCore", "ESX", "Custom UI", "MLOs"].map((tech, index) => (
              <div
                key={index}
                className="bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-purple-900/50"
              >
                <p className="text-lg font-semibold text-purple-400">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <button
          onClick={() => scrollToSection("about")}
          className="text-white opacity-75 hover:opacity-100"
          aria-label="Scroll Down"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5v14m0 0l-6-6m6 6l6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
