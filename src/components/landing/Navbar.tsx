
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { showModalSlice, showLoginModal } from "@/store/userModalSlice";
import { logout } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navbar = ({ activeSection, setActiveSection }: NavbarProps) => {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const { isLoggedIn, user } = useSelector(store => store['auth'])
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" },
  ];

  const onUserHandler = () => {

  }
  return (
    <header
      className={`fixed w-full top-0 z-40 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-sm shadow-lg" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex gap-10">
          <div className="flex cursor-pointer items-center space-x-2" onClick={() => navigator('/dashboard') }>
            <span className="text-2xl font-bold ">
              StructoNation
            </span>
          </div>
          {
            isLoggedIn &&
            <div className="flex gap-8">
              <button
                onClick={() => navigator('/profile')}
                className={`text-sm font-medium transition-colors hover:text-purple-400 text-default`}
              >Profile</button>
              {
                user.isAdmin > 0 &&
                <div className="flex gap-8">
                  <button
                    onClick={onUserHandler}
                    className={`text-sm font-medium transition-colors hover:text-purple-400 text-default`}
                  >Messages</button>
                  <button
                    onClick={onUserHandler}
                    className={`text-sm font-medium transition-colors hover:text-purple-400 text-default`}
                  >Admin</button>
                </div>
              }
            </div>
          }
        </div>
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-sm font-medium transition-colors hover:text-purple-400 ${activeSection === link.id
                ? "text-purple-500"
                : "text-gray-200"
                }`}
            >
              {link.label}
            </button>
          ))}
          {
            isLoggedIn ?
              <Button
                variant="default"
                onClick={() => dispatch(logout())}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
              >
                log out
                <img src={user.avatar}alt="avatar" className="w-[40px] h-[40px] border-[2px] border-[#ff0] mr-[-16px] rounded-full " ></img>
              </Button>
              :
              <Button
                variant="default"
                onClick={() => dispatch(showLoginModal())}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
              >
                log in
              </Button>
          }
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm p-2 font-medium transition-colors rounded-md ${activeSection === link.id
                    ? "bg-purple-900/50 text-purple-400"
                    : "text-white hover:bg-gray-800/50"
                    }`}
                >
                  {link.label}
                </button>
              ))}
              {
                isLoggedIn ?
                  <Button
                    variant="default"
                    onClick={() => dispatch(logout())}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
                  >
                    log out
                  </Button>
                  :
                  <Button
                    variant="default"
                    onClick={() => dispatch(showLoginModal())}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
                  >
                    log in
                  </Button>
              }
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
