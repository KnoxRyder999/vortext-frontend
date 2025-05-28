
import { Card, CardContent } from "@/components/ui/card";
import { serviceActions } from "@/store/serviceSlice";
import { Code, Layout, Server, Tv, Map } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ServiceSectionProps {
  id: string;
}
const initModal = {
  name: "",
  description: "",
  photo: "vortex-logo.png"
}
let selected = 0

const ServicesSection = ({ id }: ServiceSectionProps) => {
  const serviceProducts = useSelector(store => store['services'].list)
  const { isLoggedIn, user } = useSelector(store => store['auth'])
  const [modal, setModal] = useState(initModal)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
  const inputPhotoHandler = (key, value) => {
    if (key === 'photo') {
      document.body.style.pointerEvents = 'none'
      document.body.classList.add('loading')
      let formData = new FormData();
      formData.append("file", value)
      formData.append("upload_preset", "vortexbytes")
      fetch("https://api.cloudinary.com/v1_1/djta4ar8o/upload", { method: "POST", body: formData, })
        .then(response => {
          if (!response.ok) throw new Error(`Upload failed with status: ${response.status}`);
          response.json().then(res => {
            setModal(prev => ({ ...prev, [key]: res.secure_url }))
            document.body.style.pointerEvents = 'auto'
            document.body.classList.remove('loading')
          })
        })
        .catch(err => {
          console.log(err);
          alert('failed file uploading! check logs')
        })
    } else {
      setModal(prev => ({ ...prev, [key]: value }))
    }
  }
  const handleService = id => {
    setShowModal(true)
    selected = id
    setModal(serviceProducts.find(item => item.id === id))
  }
  const handleNewService = () => {
    setShowModal(true)
    setModal(initModal)
    selected = 0
  }
  const saveHandler = () => {
    if (user.isAdmin < 2) return navigate('/')
    setShowModal(false)
    if (selected === 0) dispatch(serviceActions.create(modal))
    else dispatch(serviceActions.update(selected, modal))
    selected = 0
    navigate('/')
  }
  return (
    <section
      id={id}
      className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900"
    >
      {isLoggedIn && user.isAdmin > 1 && showModal &&
        <div className="fixed center top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.6)] z-10 ">
          <div className="flex w-[700px] gap-8 flex-col p-10 border-[1px] border-[#425] bg-[#112]">
            <label className="w-full cursor-pointer change relative">
              <input type="file" hidden onChange={e => inputPhotoHandler('photo', e.target.files[0])} />
              <img src={modal.photo} alt="cover" className="w-full h-[300px] border-[2px] border-[#436]" />
              <span className="opacity-0 absolute top-50%">Edit</span>
            </label>
            <label className="w-full flex justify-between text-[20px]">
              <span>name : </span>
              <input type="text" onChange={e => inputPhotoHandler('name', e.target.value)} className="bg-[#346] px-3 w-[500px] py-1" defaultValue={modal.name} />
            </label>
            <label className="w-full flex justify-between text-[20px]">
              <span>description : </span>
              <textarea onChange={e => inputPhotoHandler('description', e.target.value)} className="bg-[#346] px-3 w-[500px] h-[200px] py-1" defaultValue={modal.description} />
            </label>
            <div className="w-full flex justify-around text-[20px]">
              <button className="bg-[#273] w-[100px] h-[40px] hover:bg-[#394] disabled:opacity-[0.5] "
                onClick={saveHandler}
              > Save </button>
              <button className="bg-[#623] w-[100px] h-[40px] hover:bg-[#834] disabled:opacity-[0.5]"
                onClick={() => setShowModal(false)}
              > Cancel </button>
            </div>
          </div>
        </div>
      }
      <div className="container mx-auto px-4 flex flex-col gap-10 ">
        <div className="text-center">
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
              className="bg-gray-800/50 min-w-[220px] w-[18%] hover:bg-gray-800/80 border-purple-900/50 transition-all duration-300 hover:-translate-y-1"
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
        <div className="flex flex-wrap gap-6 justify-between ">
          {serviceProducts.map((item, index) => (
            <div key={index}
              onClick={() => handleService(item.id)}
              className="bg-gray-800/50 w-[300px] relative hoverview cursor-pointer">
              <div className="child1 mb-2">
                <img src={item.photo} alt="cover" className="w-full h-[200px]" />
                <h3 className="text-center text-[#bbb] text-xl font-bold text-white my-3">
                  {item.name}
                </h3>
              </div>
              <div className="child2 absolute top-10 opacity-0 p-4 text-[20px]">
                <p>{item.description}</p>
              </div>
            </div>
          ))}
          {
            isLoggedIn && user && user.isAdmin > 1 &&
            <div onClick={handleNewService}
              className="bg-gray-800/50 w-[300px] relative hoverview cursor-pointer">
              <div className="child1 mb-2">
                <div className="text-[100px] w-full center h-[200px]"> + </div>
                <h3 className="text-center text-bolder text-[#bbb] text-xl font-bold text-white my-3">
                  Add New Item
                </h3>
              </div>
              <div className="child2 absolute top-10 opacity-0 p-4 text-[20px]">
                <p>Click here to add a new item.</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
