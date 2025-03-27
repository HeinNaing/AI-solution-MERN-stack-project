import React from 'react';

const MissionCard = ({ icon: IconComponent, title, description, className = "" }) => {
  return (
    <div className={`border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow ${className}`}>
      <div className="flex items-start gap-4">
        <div className="p-2 bg-opacity-10 rounded-lg">
          {IconComponent ? <IconComponent className="w-6 h-6 text-[#4052FF]" /> : (
            <svg
              className="w-6 h-6 text-[#4052FF]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;
