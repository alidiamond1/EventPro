import { useState } from 'react';
import EventPlanner from '../../components/planner/EventPlanner';

const EventPlannerPage = () => {
  const [eventDetails, setEventDetails] = useState(() => {
    const saved = localStorage.getItem('eventDetails');
    return saved ? JSON.parse(saved) : {
      name: '',
      date: '',
      type: '',
      expectedGuests: ''
    };
  });

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    const updatedDetails = { ...eventDetails, [name]: value };
    setEventDetails(updatedDetails);
    localStorage.setItem('eventDetails', JSON.stringify(updatedDetails));
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

      {/* Event Details Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Event Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={eventDetails.name}
              onChange={handleDetailsChange}
              placeholder="Enter event name"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Event Date
            </label>
            <input
              type="date"
              name="date"
              value={eventDetails.date}
              onChange={handleDetailsChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Event Type
            </label>
            <select
              name="type"
              value={eventDetails.type}
              onChange={handleDetailsChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="wedding">Wedding</option>
              <option value="corporate">Corporate Event</option>
              <option value="birthday">Birthday Party</option>
              <option value="conference">Conference</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Expected Guests
            </label>
            <input
              type="number"
              name="expectedGuests"
              value={eventDetails.expectedGuests}
              onChange={handleDetailsChange}
              placeholder="Number of guests"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            label: 'Days Until Event',
            value: eventDetails.date
              ? Math.max(0, Math.ceil((new Date(eventDetails.date) - new Date()) / (1000 * 60 * 60 * 24)))
              : '-'
          },
          {
            label: 'Expected Guests',
            value: eventDetails.expectedGuests || '-'
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
            })()
          }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center"
          >
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stat.value}
            </div>
            <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
        <EventPlanner />
      </div>

      {/* Export Options */}
      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
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
            a.download = `${eventDetails.name || 'event'}-timeline.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }}
          className="btn btn-primary"
        >
          Export Timeline
        </button>
      </div>
    </div>
  );
};

export default EventPlannerPage;