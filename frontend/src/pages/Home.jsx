/* ----  context import here  ----  */
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";


/* ----  data import  ----  */
import {images} from "../assets/images";
import { missions } from '../data/missions';
import { features } from '../data/features';


/* ----  card import here  ----  */
import MissionCard from "../components/MissionCard";
import FeatureCard from "../components/FeatureCard";

/* ----  icon import here  ----  */
import {FaEnvelope, FaChevronDown, FaGlobeAmericas, FaLightbulb, FaUsers, FaLeaf } from 'react-icons/fa';
const iconMap = {
    FaGlobeAmericas: FaGlobeAmericas,
    FaLightbulb: FaLightbulb,
    FaUsers: FaUsers,
    FaLeaf: FaLeaf
};


/* ----  home page  ----  */

const Home = () => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 mb-20 py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="max-w-[450px] w-full lg:w-1/2 mt-10">
          <p className="text-lg  font-outfit ml-3 text-gray-500">AI solution is wating for you</p>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-primary">Join us </span>
             and Grow
            <span className="text-primary"> your business </span> 
            
          </h1>
          <p className="text-lg  mb-10 font-istok text-[#777]">
          We address today's business challenges with focused AI solutions, from intelligent automation to insightful data analytics. Discover how we empower your transformation.
          </p>
          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-12 mb-12">
            <div>
              <h3 className="text-3xl font-bold ">150+</h3>
              <p className="">Industries Solutions</p>
            </div>
            <div className="border-l border-gray-300 pl-12">
              <h3 className="text-3xl font-bold ">95+</h3>
              <p className="">Software Solution</p>
            </div>
            <div className="border-l border-gray-300 pl-12">
              <h3 className="text-3xl font-bold ">100+</h3>
              <p className="">Article / Blog</p>
            </div>
          </div>
          {/* Contact Button */}
          <button className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-[#3445DB] transition-colors duration-200 font-outfit group cursor-pointer">
            Contact Now
            <FaEnvelope className="group-hover:animate-bounce"/>
          </button>
        </div>
        {/* Right Image */}
        <img src={isDarkMode ? images.problemDarkMode : images.problemLightMode} alt="Intro View" className="w-[680px] h-[500px] rotate-x-10 -rotate-y-15 rounded-2xl lg:block hidden" />

      </div>

      {/* Our Missions Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Our Missions</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Driving innovation and excellence through AI-powered solutions for a better tomorrow
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {missions.map((mission, index) => {
            return (
              <MissionCard
                key={index}
                title={mission.title}
                description={mission.description}
                icon={iconMap[mission.iconName]}
              />
            );
          })}
        </div>
      </div>

      {/* Why Choose AI Solution Section */}
      <div className=" py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Why choose AI solution company?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-lg p-3 aspect-square ">
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src={images.marketing} 
                  alt="AI Solutions Features" 
                  className="w-full h-full object-contain rounded-full shadow-lg hover:rotate-x-15 hover:-rotate-y-30 hover:scale-110 transition-all duration-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  iconName={feature.iconName}
                  isAlternate={feature.isAlternate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Solution's Blogs Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center  mb-12">
          AI Solution's Blogs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((blog) => (
            <div
              key={blog}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="bg-[#F1F5F9] p-4 aspect-video flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold  mb-2">Heading</h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc
                  maximus, nec ut commodo
                </p>
                <p className="text-sm text-gray-500">{blog} days ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedbacks Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center  mb-4 ">Feedbacks</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            maximus
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((feedback) => (
              <div key={feedback} className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-6">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  maximus, nulla ut commodo sagittis, sapien dui mattis dui"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold ">Hein Naing</h4>
                    <p className="text-sm text-gray-500">Developer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {[1, 2, 3].map((dot) => (
              <button
                key={dot}
                className={`w-2 h-2 rounded-full ${
                  dot === 1 ? "bg-[#4052FF]" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${dot}`}
              />
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};
export default Home;
