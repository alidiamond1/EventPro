import { useState } from 'react';
import EventPlanner from '../../components/planner/EventPlanner';
import EventDetails from '../../components/planner/EventDetails';

const EventPlannerPage = () => {
  const [eventDetails, setEventDetails] = useState(() => {
    const saved = localStorage.getItem('eventDetails');
    return saved ? JSON.parse(saved) : {
      eventName: '',
      eventDate: '',
      eventType: '',
      expectedGuests: ''
    };
  });

  const handleDetailsChange = (newDetails) => {
    setEventDetails(newDetails);
    localStorage.setItem('eventDetails', JSON.stringify(newDetails));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Event Planner
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Create and manage your event timeline with our easy-to-use planner.
        </p>
      </div>

      {/* Event Details Section */}
      <div className="mb-8">
        <EventDetails 
          initialDetails={eventDetails}
          onSave={handleDetailsChange}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            label: 'Days Until Event',
            value: eventDetails.eventDate
              ? Math.max(0, Math.ceil((new Date(eventDetails.eventDate) - new Date()) / (1000 * 60 * 60 * 24)))
              : '-',
            icon: '📅'
          },
          {
            label: 'Expected Guests',
            value: eventDetails.expectedGuests || '-',
            icon: '👥'
          },
          {
            label: 'Planned Activities',
            value: (() => {
              try {
                const activities = JSON.parse(localStorage.getItem('eventActivities') || '[]');
                return activities.length;
              } catch {
                return 0;
              }
            })(),
            icon: '📋'
          }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transition-colors duration-200"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {stat.value}
            </div>
            <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 transition-colors duration-200">
        <EventPlanner />
      </div>

      {/* Export Options */}
      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Print Timeline
        </button>
        <button
          onClick={() => {
            const data = {
              eventDetails,
              activities: JSON.parse(localStorage.getItem('eventActivities') || '[]')
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${eventDetails.eventName || 'event'}-timeline.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }}
          className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Export Timeline
        </button>
      </div>
    </div>
  );
};

export default EventPlannerPage;