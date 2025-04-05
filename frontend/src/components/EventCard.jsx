import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaTimes } from 'react-icons/fa';

const EventCard = ({ event }) => {
    const [showVideo, setShowVideo] = useState(false);

    const toggleVideo = () => {
        setShowVideo(!showVideo);
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48">
                {showVideo && event.videoUrl ? (
                    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
                        <div className="relative w-full max-w-4xl">
                            <button
                                onClick={toggleVideo}
                                className="absolute -top-10 right-0 text-white hover:text-gray-300"
                            >
                                <FaTimes size={24} />
                            </button>
                            <div className="relative pt-[56.25%]">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={event.videoUrl}
                                    title={event.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        {event.videoUrl && (
                            <button
                                onClick={toggleVideo}
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition-opacity group"
                            >
                                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white bg-opacity-80 group-hover:bg-opacity-100 transition-all transform group-hover:scale-110">
                                    <FaPlay className="text-gray-800 ml-1" size={24} />
                                </div>
                            </button>
                        )}
                    </>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded ${event.isPast
                        ? 'bg-indigo-900 text-indigo-300'
                        : 'bg-blue-900 text-blue-300'
                        }`}>
                        {event.isPast ? 'Past Event' : 'Product Demo'}
                    </span>
                    <span className="text-gray-500 text-xs">{event.date}</span>
                </div>
            </div>
        </div>
    );
};

EventCard.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        videoUrl: PropTypes.string,
        isPast: PropTypes.bool
    }).isRequired
};

export default EventCard; 