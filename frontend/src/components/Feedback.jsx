import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteRight, FaLinkedin, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Feedback = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    const testimonials = [
        {
            id: 1,
            name: "David Chen",
            role: "CTO at TechVision",
            company: "TechVision Industries",
            image: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
            feedback: "The AI solutions provided have revolutionized our manufacturing processes. We've seen a 40% increase in efficiency and significant cost reduction.",
            rating: 5,
            linkedIn: "https://linkedin.com/in/davidchen",
            tags: ["AI Solutions", "Manufacturing"]
        },
        {
            id: 2,
            name: "Sarah Williams",
            role: "Head of Operations",
            company: "HealthCare Plus",
            image: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
            feedback: "Their healthcare management system has transformed how we handle patient care. The integration was smooth, and the support team is exceptional.",
            rating: 5,
            linkedIn: "https://linkedin.com/in/sarahwilliams",
            tags: ["Healthcare", "Management System"]
        },
        {
            id: 3,
            name: "Michael Rodriguez",
            role: "Director of Innovation",
            company: "EduTech Global",
            image: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
            feedback: "The e-learning platform they developed exceeded our expectations. Student engagement has increased by 60% since implementation.",
            rating: 5,
            linkedIn: "https://linkedin.com/in/michaelrodriguez",
            tags: ["Education", "E-Learning"]
        }
    ];

    useEffect(() => {
        let interval;
        if (autoPlay) {
            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [autoPlay, testimonials.length]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setAutoPlay(false);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setAutoPlay(false);
    };

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Client Success Stories
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover how our solutions have transformed businesses across industries
                    </p>
                </motion.div>

                {/* Testimonials Carousel */}
                <div className="relative max-w-5xl mx-auto ">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
                        >
                            <div className="grid md:grid-cols-2 gap-8 items-center flex ">
                                {/* Image and Rating Section */}
                                <div className="text-center md:text-left">
                                    <div className="relative inline-block">
                                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20">
                                            <img
                                                src={testimonials[currentIndex].image}
                                                alt={testimonials[currentIndex].name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="absolute -bottom-4 -right-4 bg-primary text-white p-3 rounded-full shadow-lg"
                                        >
                                            <FaQuoteRight className="text-xl" />
                                        </motion.div>
                                    </div>
                                    <div className="mt-6">
                                        <div className="flex justify-center md:justify-start gap-1 mb-2">
                                            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400" />
                                            ))}
                                        </div>
                                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                            {testimonials[currentIndex].tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div>
                                    <p className="text-gray-600 text-lg mb-6 italic">
                                        "{testimonials[currentIndex].feedback}"
                                    </p>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-800">
                                            {testimonials[currentIndex].name}
                                        </h4>
                                        <p className="text-gray-600">
                                            {testimonials[currentIndex].role}
                                        </p>
                                        <p className="text-primary font-semibold">
                                            {testimonials[currentIndex].company}
                                        </p>
                                        <a
                                            href={testimonials[currentIndex].linkedIn}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mt-2"
                                        >
                                            <FaLinkedin />
                                            <span>Connect on LinkedIn</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={handlePrev}
                            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                        >
                            <FaArrowLeft className="text-primary" />
                        </button>
                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentIndex(index);
                                        setAutoPlay(false);
                                    }}
                                    className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleNext}
                            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                        >
                            <FaArrowRight className="text-primary" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feedback; 