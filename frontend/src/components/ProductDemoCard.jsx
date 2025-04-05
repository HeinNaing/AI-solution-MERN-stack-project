import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaTimes } from 'react-icons/fa';
import YouTube from 'react-youtube';

const ProductDemoCard = ({ demo }) => {
    const [showVideo, setShowVideo] = useState(false);
    const [imageError, setImageError] = useState(0);

    const videoId = useMemo(() => {
        if (!demo.videoUrl) return null;
        const match = demo.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?/]+)/);
        return match ? match[1] : null;
    }, [demo.videoUrl]);

    const thumbnailUrls = useMemo(() => {
        if (!videoId) return [demo.image];
        return [
            `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
            `https://img.youtube.com/vi/${videoId}/default.jpg`,
            demo.image
        ];
    }, [videoId, demo.image]);

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
        },
    };

    const onVideoEnd = () => {
        setShowVideo(false);
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative h-48">
                {showVideo && videoId ? (
                    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
                        <div className="relative w-full max-w-4xl">
                            <button
                                onClick={() => setShowVideo(false)}
                                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                                aria-label="Close video"
                            >
                                <FaTimes size={24} />
                            </button>
                            <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
                                <div className="absolute inset-0">
                                    <YouTube
                                        videoId={videoId}
                                        opts={opts}
                                        onEnd={onVideoEnd}
                                        className="w-full h-full"
                                        iframeClassName="w-full h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="w-full h-full bg-gray-100">
                            <img
                                src={thumbnailUrls[imageError]}
                                alt={demo.title}
                                className="w-full h-full object-cover"
                                onError={() => {
                                    setImageError((prev) => (prev + 1 < thumbnailUrls.length ? prev + 1 : prev));
                                }}
                            />
                        </div>
                        <button
                            onClick={() => setShowVideo(true)}
                            className="absolute inset-0 flex items-center justify-center  bg-opacity-40 hover:bg-opacity-50 transition-all duration-300 group"
                            aria-label="Play video"
                        >
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white bg-opacity-80 group-hover:bg-opacity-100 transition-all transform group-hover:scale-110 group-hover:shadow-lg">
                                <FaPlay className="text-gray-800 ml-1" size={24} />
                            </div>
                        </button>
                    </>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">{demo.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{demo.description}</p>
                <div className="flex justify-between items-center">
                    <span className="bg-blue-900 text-blue-300 text-xs px-3 py-1 rounded-full font-medium">
                        Product Demo
                    </span>
                    <span className="text-gray-500 text-xs">{demo.date}</span>
                </div>
            </div>
        </div>
    );
};

ProductDemoCard.propTypes = {
    demo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        videoUrl: PropTypes.string.isRequired,
    }).isRequired
};

export default ProductDemoCard;
