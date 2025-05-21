
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Code, ArrowRight } from "lucide-react";

interface PortfolioSectionProps {
  id: string;
}

const PortfolioSection = ({ id }: PortfolioSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const projects = [
    {
      id: 1,
      name: "VB Advanced Jobs System",
      description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
      tech: ["QBCore", "ESX Compatible", "Lua", "HTML/CSS/JS"],
      category: "scripts",
      client: "MidwestRP",
      images: [
        "https://cdn.pixabay.com/photo/2021/10/08/20/28/game-6692376_1280.jpg",
        "https://cdn.pixabay.com/photo/2021/09/07/07/11/game-6603193_1280.jpg",
      ],
    },
    {
      id: 2,
      name: "Metro Police Department HQ",
      description: "Detailed MLO of a modern police headquarters with integrated features for law enforcement roleplay.",
      tech: ["3D Modeling", "MLO", "Interior Design"],
      category: "mlo",
      client: "LosVentures RP",
      images: [
        "https://cdn.pixabay.com/photo/2021/09/07/01/12/police-6601253_1280.jpg",
        "https://cdn.pixabay.com/photo/2017/08/01/20/06/police-2567810_1280.jpg",
      ],
    },
    {
      id: 3,
      name: "VB Phone System",
      description: "Modern smartphone interface with apps, messaging, social media, and business integrations.",
      tech: ["HTML/CSS", "React", "Lua Integration", "Real-time Updates"],
      category: "ui",
      client: "GrandState RP",
      images: [
        "https://cdn.pixabay.com/photo/2016/11/29/12/30/phone-1869510_1280.jpg",
        "https://cdn.pixabay.com/photo/2017/12/02/14/38/contact-form-2993183_1280.jpg",
      ],
    },
    {
      id: 4,
      name: "Complete Server Setup",
      description: "Full server deployment with custom economy, jobs, and unique gameplay features.",
      tech: ["QBCore", "Server Configuration", "Database Management", "Custom Scripts"],
      category: "server",
      client: "NeonCity RP",
      images: [
        "https://cdn.pixabay.com/photo/2018/03/27/12/16/analytics-3265840_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/11/30/20/44/computer-1873831_1280.png",
      ],
    },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section
      id={id}
      className="py-20 md:py-32 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
              Our Portfolio
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Check out some of our recent work
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["all", "scripts", "server", "ui", "mlo"].map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={
                  activeCategory === category
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "border-purple-600 text-purple-400 hover:bg-purple-900/20"
                }
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="bg-gray-800/50 border-purple-900/50 overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.images[0]}
                  alt={project.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                  {project.category.toUpperCase()}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                  Client: {project.client}
                </p>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-700 text-purple-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-600 text-purple-400 hover:bg-purple-900/20"
                  >
                    <Eye className="mr-2 h-4 w-4" /> View Demo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-600 text-blue-400 hover:bg-blue-900/20"
                  >
                    <Code className="mr-2 h-4 w-4" /> Technical Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-purple-600 hover:bg-purple-700">
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
