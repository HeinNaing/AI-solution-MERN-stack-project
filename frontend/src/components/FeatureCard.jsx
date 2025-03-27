import React from 'react';
import { FaRocket, FaShieldAlt, FaChartLine, FaBrain } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';
const iconMap = {
    FaRocket,
    FaShieldAlt,
    FaChartLine,
    FaBrain
};

const FeatureCard = ({ title, description, iconName, isAlternate }) => {
    const Icon = iconMap[iconName];
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div className={`p-6 h-50 rounded-lg ${isAlternate ? "bg-[#4052FF]" : "bg-white"} shadow`}>
            <div className="mb-4">
                <Icon 
                    className={`w-6 h-6 ${isAlternate ? "text-white" : "text-[#4052FF]"}`}
                />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${isAlternate ? "text-white" : "text-black"}`}>
                {title}
            </h3>
            <p className={isAlternate ? "text-white" : "text-gray-600"}>
                {description}
            </p>
        </div>
    );
};

export default FeatureCard; 