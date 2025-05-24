
import { Card, CardContent } from "@/components/ui/card";
import { Code, Globe, Users } from "lucide-react";

interface AboutSectionProps {
  id: string;
}

const AboutSection = ({ id }: AboutSectionProps) => {
  const teamMembers = [
    {
      name: "𝔇𝔞𝔯𝔨 𝔪𝔞𝔤𝔦𝔠",
      name1: "Adam dean",
      role: "Lead Developer",
      skills: "Script Development, UI/UX Design",
      image: "magic.jpeg",
    },
    {
      name: "VortexBytes",
      name1: "Fawaz Hassan",
      role: "3D Modeler",
      skills: "MLO Creation, Asset Design",
      image: "Fawaz.jpg",
    },
    {
      name: "Axelknight",
      name1: "Axelknight",
      role: "Server Specialist",
      skills: "Server Configuration, Performance Optimization",
      image: "./adam.jpg",
    },
  ];

  return (
    <section
      id={id}
      className="py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-black"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
              About VortexBytes
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Delivering optimized FiveM experiences for immersive RP worlds
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Our Story</h3>
            <p className="text-gray-300 mb-4">
              VortexBytes began when a group of passionate FiveM developers
              noticed a gap in the marketplace: high-quality, optimized scripts
              that didn't tank server performance.
            </p>
            <p className="text-gray-300 mb-4">
              Founded in 2021, we've since grown into a team of specialists
              dedicated to creating the best possible roleplaying experience for
              FiveM communities worldwide.
            </p>
            <p className="text-gray-300">
              Our mission is simple: deliver premium FiveM resources that enhance
              gameplay without sacrificing performance.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-purple-900/50">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <Code className="h-12 w-12 text-purple-500" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Clean Code
                </h4>
                <p className="text-gray-400 text-sm">
                  Optimized scripts that prioritize server performance
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-purple-900/50">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <Users className="h-12 w-12 text-blue-500" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Player Experience
                </h4>
                <p className="text-gray-400 text-sm">
                  Designed with roleplayers and administrators in mind
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-purple-900/50 col-span-2">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <Globe className="h-12 w-12 text-green-500" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Global Community
                </h4>
                <p className="text-gray-400 text-sm">
                  Supporting FiveM servers around the world with custom solutions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-8 text-white text-center">
          Meet The Team
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-purple-900/50 overflow-hidden"
            >
              <div className="h-58 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full object-cover object-center"
                />
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-white mb-1">
                  {member.name}
                </h4>
                <p className="text-purple-400 mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.skills}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
