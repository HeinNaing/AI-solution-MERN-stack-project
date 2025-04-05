import React from 'react';
import PropTypes from 'prop-types';

const EventCard = ({ event, variant = 'default' }) => {
    // Get the right styling based on variant (past/upcoming/featured)
    const getVariantStyles = () => {
        switch (variant) {
            case 'past':
                return {
                    card: 'bg-gray-800',
                    badge: 'bg-indigo-900 text-indigo-300',
                    badgeText: 'Past Event',
                    imageContainer: 'bg-gray-700',
                    title: 'text-white',
                    description: 'text-gray-400',
                    date: 'text-gray-400'
                };
            case 'upcoming':
                return {
                    card: 'bg-blue-900',
                    badge: 'bg-blue-700 text-blue-200',
                    badgeText: 'Upcoming Event',
                    imageContainer: 'bg-blue-800',
                    title: 'text-white',
                    description: 'text-blue-200',
                    date: 'text-blue-300'
                };
            case 'featured':
                return {
                    card: 'bg-gradient-to-br from-indigo-900 to-purple-900 border border-indigo-500',
                    badge: 'bg-purple-700 text-purple-200',
                    badgeText: 'Featured Event',
                    imageContainer: 'bg-black bg-opacity-30',
                    title: 'text-white',
                    description: 'text-indigo-200',
                    date: 'text-indigo-300'
                };
            default:
                return {
                    card: 'bg-gray-800',
                    badge: 'bg-gray-700 text-gray-300',
                    badgeText: 'Event',
                    imageContainer: 'bg-gray-700',
                    title: 'text-white',
                    description: 'text-gray-400',
                    date: 'text-gray-400'
                };
        }
    };

    const styles = getVariantStyles();

    return (
        <div className={`${styles.card} rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-[1.02]`}>
            <div className={`h-48 ${styles.imageContainer} flex items-center justify-center relative`}>
                {event.image ? (
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <svg className="w-24 h-24 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z" />
                        <path d="M8 10l3 3 1.5-1.5L15 14V6H8v4z" />
                    </svg>
                )}
            </div>
            <div className="p-4">
                <h3 className={`font-semibold text-lg mb-2 ${styles.title}`}>{event.title}</h3>
                <p className={`${styles.description} text-sm mb-4 line-clamp-2`}>{event.description}</p>
                <div className="flex justify-between items-center">
                    <span className={`${styles.badge} text-xs px-2 py-1 rounded`}>{styles.badgeText}</span>
                    <span className={`${styles.date} text-xs`}>{event.date}</span>
                </div>
            </div>
        </div>
    );
};

EventCard.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        image: PropTypes.string
    }).isRequired,
    variant: PropTypes.oneOf(['default', 'past', 'upcoming', 'featured'])
};

export default EventCard;