import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router';
import {
    FaArrowRight, FaIndustry, FaHospital, FaGraduationCap,
    FaShoppingCart, FaBriefcase, FaChartLine
} from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const IndustrySolution = () => {
    const { isDarkMode } = useContext(ThemeContext);

    const industries = [
        {
            id: 1,
            icon: <FaIndustry className="text-4xl" />,
            title: "Manufacturing",
            description: "Smart factory solutions, automation systems, and IoT integration for enhanced production efficiency.",
            solutions: ["Predictive Maintenance", "Supply Chain Optimization", "Quality Control AI"],
            color: "bg-blue-500"
        },
        {
            id: 2,
            icon: <FaHospital className="text-4xl" />,
            title: "Healthcare",
            description: "Digital health platforms, patient management systems, and medical data analytics.",
            solutions: ["Patient Care Analytics", "Medical Imaging AI", "Hospital Management System"],
            color: "bg-green-500"
        },
        {
            id: 3,
            icon: <FaGraduationCap className="text-4xl" />,
            title: "Education",
            description: "E-learning platforms, student management systems, and educational analytics tools.",
            solutions: ["Learning Management", "Student Analytics", "Virtual Classrooms"],
            color: "bg-purple-500"
        },
        {
            id: 4,
            icon: <FaShoppingCart className="text-4xl" />,
            title: "Retail",
            description: "E-commerce solutions, inventory management, and customer analytics platforms.",
            solutions: ["E-commerce Platform", "Inventory Management", "Customer Analytics"],
            color: "bg-red-500"
        },
        {
            id: 5,
            icon: <FaBriefcase className="text-4xl" />,
            title: "Finance",
            description: "Financial management systems, banking solutions, and fintech applications.",
            solutions: ["Banking Software", "Payment Gateway", "Risk Management"],
            color: "bg-yellow-500"
        },
        {
            id: 6,
            icon: <FaChartLine className="text-4xl" />,
            title: "Business-Intelligence",
            description: "Data analytics, reporting tools, and business performance monitoring solutions.",
            solutions: ["Data Analytics", "Business Reporting", "Performance Monitoring"],
            color: "bg-indigo-500"
        }
    ];

    return (
        <div className="min-h-screen pt-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
                <div className="container mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6 text-center"
                    >
                        Industry Solutions
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-center max-w-2xl mx-auto"
                    >
                        Transforming businesses across industries with innovative software solutions
                    </motion.p>
                </div>
            </div>

            {/* Industries Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {industries.map((industry, index) => (
                        <motion.div
                            key={industry.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className={`${industry.color} p-6 text-white`}>
                                <div className="flex items-center justify-between">
                                    {industry.icon}
                                    <h3 className="text-2xl font-bold">{industry.title}</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 mb-4">{industry.description}</p>
                                <div className="space-y-2">
                                    {industry.solutions.map((solution, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                                            <span className="text-black">{solution}</span>
                                        </div>
                                    ))}
                                </div>
                                <NavLink
                                    to={`/about-us/solutions/${industry.title.toLowerCase()}`}
                                    className="mt-6 inline-flex items-center text-primary hover:text-primary-dark"
                                >
                                    Learn more <FaArrowRight className="ml-2" />
                                </NavLink>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Let's discuss how our solutions can help your industry thrive in the digital age.
                    </p>
                    <NavLink
                        to="/contact-us"
                        className="btn btn-primary btn-lg"
                    >
                        Contact Us Today
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default IndustrySolution;