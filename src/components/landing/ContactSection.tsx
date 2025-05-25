
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/sonner";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useSelector } from "react-redux";

interface ContactSectionProps {
  id: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  discord: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const ContactSection = ({ id }: ContactSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, user } = useSelector(store => store['auth'])
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      discord: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
    },
  });

  const onSubmit = (data: FormData) => {
    if(!isLoggedIn) {
      alert("You should log in first!")
      return
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsLoading(false);
      toast.success("Message sent successfully! We'll get back to you soon.");
      form.reset();
    }, 1500);
  };

  return (
    <section
      id={id}
      className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
              Get In Touch
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to take your server to the next level? Let's discuss your project.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div>
            <Card className="bg-gray-800/50 border-purple-900/50 h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Contact Info</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-900/50 flex items-center justify-center mr-4">
                      <MessageSquare className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Discord</h4>
                      <p className="text-gray-300">VortexBytes#1234</p>
                      <a href="https://discord.gg/vortexbytes" className="text-purple-400 text-sm hover:underline">
                        Join Our Server
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-900/50 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Email</h4>
                      <p className="text-gray-300">contact@vortexbytes.com</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2">Timezone</h4>
                    <p className="text-gray-300">UTC-5 (Eastern Time)</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Active hours: 10am - 10pm EST
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2">Payment Methods</h4>
                    <p className="text-gray-300">PayPal, Stripe, Bitcoin</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="bg-gray-800/50 border-purple-900/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">
                  Request Custom Work
                </h3>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                className="bg-gray-700/50 border-gray-600 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                className="bg-gray-700/50 border-gray-600 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="discord"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Discord Username</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="username#0000"
                                className="bg-gray-700/50 border-gray-600 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="projectType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Project Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                                  <SelectValue placeholder="Select project type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-800 border-gray-600">
                                <SelectItem value="script">Custom Script</SelectItem>
                                <SelectItem value="server">Server Setup</SelectItem>
                                <SelectItem value="ui">UI/UX System</SelectItem>
                                <SelectItem value="mlo">MLO / Map Mod</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Budget Range</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                                  <SelectValue placeholder="Select budget range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-800 border-gray-600">
                                <SelectItem value="under100">Under $100</SelectItem>
                                <SelectItem value="100-250">$100 - $250</SelectItem>
                                <SelectItem value="250-500">$250 - $500</SelectItem>
                                <SelectItem value="500-1000">$500 - $1000</SelectItem>
                                <SelectItem value="1000plus">$1000+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="timeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Timeline</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                                  <SelectValue placeholder="Select timeline" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-800 border-gray-600">
                                <SelectItem value="urgent">ASAP (1-3 days)</SelectItem>
                                <SelectItem value="week">This week</SelectItem>
                                <SelectItem value="twoweeks">1-2 weeks</SelectItem>
                                <SelectItem value="month">Within a month</SelectItem>
                                <SelectItem value="flexible">Flexible</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Project Details</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project requirements..."
                              className="bg-gray-700/50 border-gray-600 text-white resize-none min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center"
                        >
                          <Send className="mr-2 h-5 w-5" /> Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
