
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Code, ArrowRight, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { closeProjetPage, editProjetPage } from "@/store/projectSlice";

interface PortfolioSectionProps {
  id: string;
}

const PortfolioSection = ({ id }: PortfolioSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { isLoggedIn, user } = useSelector(store => store['auth'])
  const navicate = useNavigate()
  const dispatch = useDispatch()

  const projectList = useSelector(store => store['projects'].list)

  const filteredProjects =
    activeCategory === "all"
      ? projectList
      : projectList.filter((project) => project.category === activeCategory);
  const settingHandler = (id) => {
    dispatch(editProjetPage(id))
    navicate('/project/' + id)
  }
  const createProductHandler = () => {
    dispatch(closeProjetPage())
    navicate('/project')
  }
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
                    : "border-purple-600 text-purple-400 hover:bg-[#16a]"
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
              className="bg-gray-800/50 border-[#16a] overflow-hidden"
            >
              <div className="relative h-auto overflow-hidden">
                <img
                  src={project.photos[0]}
                  alt={project.name}
                  className="w-full h-[400px] object-cover object-center transition-transform duration-700 hover:scale-110"
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
                  {project.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-700 text-purple-300 px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-600 text-purple-400 hover:bg-[#16a]"
                  >
                    <Eye className="mr-2 h-4 w-4" /> View Demo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-600 text-blue-400 hover:bg-[#293]"
                  >
                    <Code className="mr-2 h-4 w-4" /> Technical Details
                  </Button>
                  { isLoggedIn &&
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => settingHandler(project.id)}
                      className="border-blue-600 text-blue-400 bg-primary hover:bg-[#293]"
                    >
                      <Code className="mr-2 h-4 w-4" /> Setting
                    </Button>
                  }
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 flex w-full justify-between">
          <Button className="bg-purple-600 hover:bg-purple-700">
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          {
            isLoggedIn && <Button
              variant="outline"
              size="sm"
              onClick={createProductHandler}
              className="border-purple-600 text-[#ff0] hover:bg-[#16a] bg-[#0c0]"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Portfolio
            </Button>
          }
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
