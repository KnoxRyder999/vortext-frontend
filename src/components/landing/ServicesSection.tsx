
import { Card, CardContent } from "@/components/ui/card";
import { Code, Layout, Server, Tv, Map } from "lucide-react";

interface ServiceSectionProps {
  id: string;
}

const ServicesSection = ({ id }: ServiceSectionProps) => {
  const services = [
    {
      icon: <Code className="text-purple-500" />,
      title: "Custom Scripts",
      description:
        "Tailor-made scripts for QBCore, ESX, and standalone implementations. Optimized for performance with clean code.",
      features: ["QBCore Compatible", "ESX Ready", "Standalone Options", "Optimized Code"],
    },
    {
      icon: <Server className="text-blue-500" />,
      title: "Server Setups",
      description:
        "Complete server configuration and deployment. From basic setups to complex ecosystems with custom features.",
      features: ["Framework Installation", "Resource Configuration", "Performance Tuning", "Security Hardening"],
    },
    {
      icon: <Layout className="text-green-500" />,
      title: "UI/UX Systems",
      description:
        "Modern, responsive interfaces for your FiveM server. Intuitive design that enhances player experience.",
      features: ["Custom HUDs", "Inventory Systems", "Phone Interfaces", "Admin Panels"],
    },
    {
      icon: <Map className="text-yellow-500" />,
      title: "MLOs & Mods",
      description:
        "Custom map modifications and interior designs to make your server unique and immersive.",
      features: ["Interior Designs", "Custom Buildings", "Map Additions", "Optimized for Performance"],
    },
    {
      icon: <Tv className="text-red-500" />,
      title: "Live Support",
      description:
        "Ongoing technical assistance and troubleshooting for all our products and services.",
      features: ["Discord Support", "Bug Fixes", "Update Installation", "Performance Monitoring"],
    },
  ];

  return (
    <section
      id={id}
      className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
              Our Services
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Premium development solutions for your FiveM server
          </p>
        </div>

        <div className="flex flex-wrap gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 w-[18%] hover:bg-gray-800/80 border-purple-900/50 transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-400">
                      <span className="mr-2 text-purple-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
