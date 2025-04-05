import React, { useState, useEffect } from 'react';
import { images } from '../../assets/images';
const Chatwidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot Button - Modern circular button with hover effect */}
      <button
        onClick={toggleChatbot}
        className="bg-gradient-to-r from-[#7630ff] to-[#422ad5] text-white rounded-full w-16 h-16 shadow-2xl flex items-center justify-center transition-transform hover:scale-110 focus:outline-none cursor-pointer"
        aria-label="Chat with AI assistant"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (

          <img src={images.chatbot} alt="Chatbot" className="w-8 h-8" />
        )}
      </button>

      {/* Chatbot Container */}
      <div
        className={`absolute bottom-20 right-0
          ${isMobile ? 'w-[90vw] max-w-[400px]' : 'w-96'}
          h-[500px] max-h-[80vh]
          bg-white rounded-lg shadow-2xl overflow-hidden 
          transition-all duration-300 
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
          border border-gray-300`}
        style={{ transformOrigin: 'bottom right' }}
      >
        {/* Chatbot Header - Updated with better design */}
        <div className="bg-[#6930ff] text-white p-4 flex justify-between items-center rounded-t-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl">AI Assistant</span>
          </div>
          <button
            onClick={toggleChatbot}
            className="text-white hover:text-gray-200 focus:outline-none cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Chatbot Frame */}
        <div className="w-full h-[calc(100%-56px)]">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/BzmZxSrc9I4FqwUZCLRNR"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title="AI Solutions Chatbot"
            className="bg-white rounded-b-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Chatwidget;
