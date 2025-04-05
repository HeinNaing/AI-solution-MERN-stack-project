/* ----  context import here  ----  */
import { ThemeContext } from "../context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";

/* ----  data import  ----  */
import { images } from "../assets/images";
import { missions } from '../data/missions';
import { features } from '../data/features';
import { blogPosts } from '../data/blogPosts';
import Feedback from "../components/Feedback";

/* ----  card import here  ----  */
import MissionCard from "../components/MissionCard";
import FeatureCard from "../components/FeatureCard";
import BlogCard from '../components/BlogCard';
import { api } from "../services/api"
/* ----  icon import here  ----  */
import { FaEnvelope, FaChevronDown, FaGlobeAmericas, FaLightbulb, FaUsers, FaLeaf } from 'react-icons/fa';
const iconMap = {
  FaGlobeAmericas: FaGlobeAmericas,
  FaLightbulb: FaLightbulb,
  FaUsers: FaUsers,
  FaLeaf: FaLeaf
};


/* ----  home page  ----  */

const Home = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await api.get('/blogs?page=1&limit=3');
        console.log(response);
        setRecentPosts(response.blogs);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      }
    };
    fetchRecentPosts();
  }, []);

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
          <Link to="/contact-us" className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-[#3445DB] transition-colors duration-200 font-outfit group cursor-pointer w-fit">
            Contact Now
            <FaEnvelope className="group-hover:animate-bounce" />
          </Link>
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
        <h2 className="text-3xl font-bold text-center mb-12">
          AI Solution's Blogs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      <Feedback />


    </div>
  );
};
export default Home;
