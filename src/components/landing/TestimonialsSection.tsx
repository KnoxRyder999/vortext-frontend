
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialsSectionProps {
  id: string;
}

const TestimonialsSection = ({ id }: TestimonialsSectionProps) => {
  const testimonials = [
    {
      text: "VortexBytes delivered a custom job system that exceeded our expectations. The performance is excellent, and our players love the features.",
      author: "James Wilson",
      position: "Owner, MidwestRP",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    },
    {
      text: "The MLO they created for our police department is incredibly detailed. It's become a centerpiece for our server's law enforcement RP.",
      author: "Lisa Thompson",
      position: "Admin, LosVentures RP",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    },
    {
      text: "Working with VortexBytes on our custom phone system was a breeze. They understood exactly what we needed and delivered on time.",
      author: "Michael Davis",
      position: "Developer, GrandState RP",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
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
              Client Testimonials
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear what our clients have to say about our services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-purple-900/50 hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-purple-600">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="text-center mb-4">
                  <svg
                    className="h-8 w-8 text-purple-500 mx-auto opacity-50"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>

                <p className="text-gray-300 mb-6 text-center">
                  {testimonial.text}
                </p>

                <div className="text-center">
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-purple-400 text-sm">{testimonial.position}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
