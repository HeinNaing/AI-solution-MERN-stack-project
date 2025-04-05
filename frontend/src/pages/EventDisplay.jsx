import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import EventCard from '../components/EventCard';
import ProductDemoCard from '../components/ProductDemoCard';

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
            image: 'https://images.unsplash.com/photo-1670382417551-d2f1ee29aea4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEFJJTIwaW4lMjBIZWFsdGhjYXJlJTIwU3VtbWl0JTIwd29ya3Nob3B8ZW58MHx8MHx8fDA%3D'
        },
        {
            id: 2,
            title: 'Machine Learning Workshop',
            description: 'Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo.',
            date: '2 days ago',
            image: 'https://images.unsplash.com/photo-1635468073086-7edff555234a?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEFJJTIwaW4lMjBIZWFsdGhjYXJlJTIwU3VtbWl0JTIwd29ya3Nob3B8ZW58MHx8MHx8fDA%3D'
        },
        {
            id: 3,
            title: 'Future of AI Conference',
            description: 'Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo.',
            date: '2 days ago',
            image: 'https://media.istockphoto.com/id/2193842031/photo/colleagues-talking-about-ai.webp?a=1&b=1&s=612x612&w=0&k=20&c=grCSMztXX6jgT2noRUK7Huamrm1s18y4tdIfVEFzZEA='
        },
        {
            id: 4,
            title: 'Data Science Symposium',
            description: 'Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo.',
            date: '3 days ago',
            image: 'https://images.unsplash.com/photo-1559146820-a75deba24b58?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fERhdGElMjBTY2llbmNlJTIwU3ltcG9zaXVtfGVufDB8fDB8fHww'
        }
    ]);

    const [productDemos, setProductDemos] = useState([
        {
            id: '1',
            title: 'AI Analytics Platform',
            description: 'Experience our cutting-edge AI Analytics Platform in action. See how it transforms raw data into actionable insights.',
            date: '2 days ago',
            image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&auto=format&fit=crop&q=60',
            videoUrl: 'https://www.youtube.com/watch?v=CIFCD3yQTIA&pp=ygUVQUkgQW5hbHl0aWNzIFBsYXRmb3Jt'
        },
        {
            id: '2',
            title: 'Neural Network Solution',
            description: 'Watch a live demonstration of our Neural Network Solution processing and learning from complex datasets.',
            date: '2 days ago',
            image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60',
            videoUrl: 'https://www.youtube.com/watch?v=cAkMcPfY_Ns&t=94s&pp=ygUXbmV1cmFsIG5ldHdvcmsgcHJvamVjdHM%3D'
        },
        {
            id: '3',
            title: 'Smart Automation Tools',
            description: 'See how our Smart Automation Tools can streamline your workflow and boost productivity.',
            date: '2 days ago',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60',
            videoUrl: 'https://www.youtube.com/watch?v=gpB4600keWA&pp=ygUWU21hcnQgQXV0b21hdGlvbiBUb29scw%3D%3D'
        },
        {
            id: '4',
            title: 'Predictive Analysis Suite',
            description: 'Discover the power of our Predictive Analysis Suite through this comprehensive demo.',
            date: '3 days ago',
            image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&auto=format&fit=crop&q=60',
            videoUrl: 'https://www.youtube.com/watch?v=vjXsirDXvCo'
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
                            <Link to="/contact-us" className="btn bg-white/20 hover:bg-white/30 text-white border-none px-8">
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
            <div className="container mx-auto px-4 text-center mb-24 pt-10">
            </div>

            {/* Past Promotional Events with id for scrolling */}
            <div id="past-events" ref={pastEventsRef} className="container mx-auto px-4 mb-24 scroll-mt-24 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold ">Past promotional Events</h2>

                    <div className="flex gap-2">
                        <button
                            onClick={prevPastEvents}
                            className="p-2 rounded-full bg-gray-200 hover:bg-gray-700 transition-colors"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={nextPastEvents}
                            className="p-2 rounded-full bg-gray-200 hover:bg-gray-700 transition-colors"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6  ">
                    {visiblePastEvents.map(event => (
                        <EventCard key={event.id} event={{ ...event, isPast: true }} />
                    ))}
                </div>
            </div>

            {/* Product Demos */}
            <div className="container mx-auto px-4 mb-16 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold ">Product Demos</h2>

                    <div className="flex gap-2">
                        <button
                            onClick={prevProductDemos}
                            className="p-2 rounded-full bg-gray-200 hover:bg-gray-700 transition-colors"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={nextProductDemos}
                            className="p-2 rounded-full bg-gray-200 hover:bg-gray-700 transition-colors"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {visibleProductDemos.map(demo => (
                        <ProductDemoCard key={demo.id} demo={demo} />
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            {/* <div className="container mx-auto px-4 py-16 text-center">
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
            </div> */}
        </div>
    );
};

export default EventDisplay;