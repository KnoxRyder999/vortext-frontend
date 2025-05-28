
import { useEffect, useState } from "react";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import ServicesSection from "@/components/landing/ServicesSection";
import PortfolioSection from "@/components/landing/PortfolioSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import RegisterModal from "@/components/modal/RegisterModal";
import { projectActions } from "@/store/projectSlice";
import { useDispatch } from "react-redux";
import { userApi } from "@/store/authSlice";
import { serviceActions } from "@/store/serviceSlice";

const Landing = () => {
  const [activeSection, setActiveSection] = useState("home");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectActions['getAll']())
    dispatch(userApi.getAdmin())
    dispatch(serviceActions.getAll())
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <RegisterModal />
      <main>
        <HeroSection id="home" setActiveSection={setActiveSection} />
        <AboutSection id="about" />
        <ServicesSection id="services" />
        <PortfolioSection id="portfolio" />
        <TestimonialsSection id="testimonials" />
        <ContactSection id="contact" />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
