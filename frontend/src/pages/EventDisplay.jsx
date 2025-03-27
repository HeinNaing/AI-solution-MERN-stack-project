import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';

const EventDisplay = () => {
    // State for countdown timer
    const [timeLeft, setTimeLeft] = useState({
        days: 45,
        hours: 14,
        minutes: 2,
        seconds: 20
    });

    // Reference to past events section
    const pastEventsRef = useRef(null);

    // Scroll to past events with smooth animation
    const scrollToPastEvents = (e) => {
        e.preventDefault();
        pastEventsRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
        });
    };

    // State for past events and product demos
    const [pastEvents, setPastEvents] = useState([
        {
            id: 1,
            title: 'AI in Healthcare Summit',
            description: 'Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo.',
            date: '2 days ago',
            image: '/placeholder.jpg'
        },
        {
            id: 2,
            title: 'Machine Learning Workshop',
            description: 'Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo.',
            date: '2 days ago',
            image: '/placeholder.jpg'
        },
        {
            id: 3,
            title: 'Future of AI Conference',
            description: 'Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo.',
            date: '2 days ago',
            image: '/placeholder.jpg'
        },
        {
            id: 4,
            title: 'Data Science Symposium',
            description: 'Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo.',
            date: '3 days ago',
            image: '/placeholder.jpg'
        }
    ]);

    const [productDemos, setProductDemos] = useState([
        {
            id: 1,
            title: 'AI Analytics Platform',
            description: 'Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo.',
            date: '2 days ago',
            image: '/placeholder.jpg'
        },
        {
            id: 2,
            title: 'Neural Network Solution',
            description: 'Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo.',
            date: '2 days ago',
            image: '/placeholder.jpg'
        },
        {
            id: 3,
            title: 'Smart Automation Tools',
            description: 'Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo.',
            date: '2 days ago',
            image: '/placeholder.jpg'
        },
        {
            id: 4,
            title: 'Predictive Analysis Suite',
            description: 'Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo.',
            date: '3 days ago',
            image: '/placeholder.jpg'
        }
    ]);

    // Slider state
    const [currentPastEventIndex, setCurrentPastEventIndex] = useState(0);
    const [currentProductDemoIndex, setCurrentProductDemoIndex] = useState(0);
    const itemsPerSlide = 3;

    // Countdown timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft.seconds > 0) {
                setTimeLeft(prev => ({ ...prev, seconds: prev.seconds - 1 }));
            } else if (timeLeft.minutes > 0) {
                setTimeLeft(prev => ({ ...prev, minutes: prev.minutes - 1, seconds: 59 }));
            } else if (timeLeft.hours > 0) {
                setTimeLeft(prev => ({ ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }));
            } else if (timeLeft.days > 0) {
                setTimeLeft(prev => ({ ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }));
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // Slider navigation functions
    const nextPastEvents = () => {
        if (currentPastEventIndex + itemsPerSlide < pastEvents.length) {
            setCurrentPastEventIndex(currentPastEventIndex + 1);
        } else {
            setCurrentPastEventIndex(0); // Loop back to the beginning
        }
    };

    const prevPastEvents = () => {
        if (currentPastEventIndex > 0) {
            setCurrentPastEventIndex(currentPastEventIndex - 1);
        } else {
            setCurrentPastEventIndex(pastEvents.length - itemsPerSlide); // Loop to the end
        }
    };

    const nextProductDemos = () => {
        if (currentProductDemoIndex + itemsPerSlide < productDemos.length) {
            setCurrentProductDemoIndex(currentProductDemoIndex + 1);
        } else {
            setCurrentProductDemoIndex(0); // Loop back to the beginning
        }
    };

    const prevProductDemos = () => {
        if (currentProductDemoIndex > 0) {
            setCurrentProductDemoIndex(currentProductDemoIndex - 1);
        } else {
            setCurrentProductDemoIndex(productDemos.length - itemsPerSlide); // Loop to the end
        }
    };

    // Get visible items for each slider
    const visiblePastEvents = pastEvents.slice(currentPastEventIndex, currentPastEventIndex + itemsPerSlide);
    const visibleProductDemos = productDemos.slice(currentProductDemoIndex, currentProductDemoIndex + itemsPerSlide);

    return (
        <div className="min-h-screen">
            <div
                className="hero min-h-[860px] relative"
                style={{
                    backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                }}>
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center mb-20">
                    <div className="max-w-md">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Touch with our AI Solution's Events
                        </h1>
                        <p className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                </div>
                
                {/* Countdown Timer - Positioned absolutely over the hero image */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-full max-w-3xl mx-auto">
                    <div className="bg-gradient-to-r from-indigo-800/80 via-blue-700/80 to-purple-800/80 backdrop-blur border border-indigo-500/30 rounded-lg p-8 shadow-2xl">
                        <div className="grid grid-cols-4 gap-6 text-center">
                            <div className="bg-gradient-to-b from-white/20 to-white/5 py-4 rounded-lg">
                                <div className="text-4xl font-bold text-white mb-2">{timeLeft.days}</div>
                                <div className="text-white/80">Days</div>
                            </div>
                            <div className="bg-gradient-to-b from-white/20 to-white/5 py-4 rounded-lg">
                                <div className="text-4xl font-bold text-white mb-2">{timeLeft.hours}</div>
                                <div className="text-white/80">Hours</div>
                            </div>
                            <div className="bg-gradient-to-b from-white/20 to-white/5 py-4 rounded-lg">
                                <div className="text-4xl font-bold text-white mb-2">{timeLeft.minutes}</div>
                                <div className="text-white/80">Minutes</div>
                            </div>
                            <div className="bg-gradient-to-b from-white/20 to-white/5 py-4 rounded-lg">
                                <div className="text-4xl font-bold text-white mb-2">{timeLeft.seconds}</div>
                                <div className="text-white/80">Seconds</div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <Link to="/events/book" className="btn bg-white/20 hover:bg-white/30 text-white border-none px-8">
                                Book Today <FaArrowRight className="ml-2" />
                            </Link>
                        </div>
                    </div>
                        <div className="flex justify-center my-8">
                                    <a 
                                        href="#past-events" 
                                        onClick={scrollToPastEvents}
                                        className="btn btn-primary px-6 group"
                                    >
                                        View past events
                                        <FaChevronDown className="ml-2 animate-bounce" />
                                    </a>
                        </div>
                </div>
            </div>

            {/* Spacer for countdown that now overlaps */}
            <div className="container mx-auto px-4 text-center mb-24 pt-20">
            </div>

            {/* Past Promotional Events with id for scrolling */}
            <div id="past-events" ref={pastEventsRef} className="container mx-auto px-4 mb-24 scroll-mt-24">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-300">Past promotional Events</h2>

                    <div className="flex gap-2">
                        <button
                            onClick={prevPastEvents}
                            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={nextPastEvents}
                            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {visiblePastEvents.map(event => (
                        <div key={event.id} className="bg-gray-800 rounded-lg overflow-hidden">
                            <div className="h-48 bg-gray-700 flex items-center justify-center">
                                <svg className="w-24 h-24 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z" />
                                    <path d="M8 10l3 3 1.5-1.5L15 14V6H8v4z" />
                                </svg>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{event.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="bg-indigo-900 text-indigo-300 text-xs px-2 py-1 rounded">Past Event</span>
                                    <span className="text-gray-400 text-xs">{event.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Demos */}
            <div className="container mx-auto px-4 mb-16">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-300">Product Demos</h2>

                    <div className="flex gap-2">
                        <button
                            onClick={prevProductDemos}
                            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={nextProductDemos}
                            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {visibleProductDemos.map(demo => (
                        <div key={demo.id} className="bg-gray-800 rounded-lg overflow-hidden">
                            <div className="h-48 bg-gray-700 flex items-center justify-center">
                                <svg className="w-24 h-24 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z" />
                                    <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-1 6h-1v-1h1v1zm0-3h-1V9h1v2zm3 3h-1v-1h1v1zm0-3h-1V9h1v2z" />
                                </svg>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2">{demo.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{demo.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded">Product Demo</span>
                                    <span className="text-gray-400 text-xs">{demo.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl font-bold mb-6">Join Our Next AI Solution Event</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                    Stay updated with the latest AI technologies and industry trends.
                    Network with experts and learn how our solutions can transform your business.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/events/upcoming" className="btn btn-primary">
                        Upcoming Events
                    </Link>
                    <Link to="/events/register" className="btn btn-outline">
                        Register Interest
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventDisplay;