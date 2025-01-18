import { useState } from 'react';

const EventDetails = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventType: '',
    expectedGuests: ''
  });

  const eventTypes = [
    { id: 'wedding', label: 'Wedding' },
    { id: 'corporate', label: 'Corporate Event' },
    { id: 'birthday', label: 'Birthday Party' },
    { id: 'conference', label: 'Conference' },
    { id: 'social', label: 'Social Gathering' },
    { id: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6 transition-colors duration-200">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Event Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
            placeholder="Enter event name"
          />
        </div>

        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Event Date
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          />
        </div>

        <div>
          <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Event Type
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          >
            <option value="" className="bg-white dark:bg-gray-700">Select Type</option>
            {eventTypes.map(type => (
              <option 
                key={type.id} 
                value={type.id}
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="expectedGuests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Expected Guests
          </label>
          <input
            type="number"
            id="expectedGuests"
            name="expectedGuests"
            value={formData.expectedGuests}
            onChange={handleChange}
            min="1"
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            placeholder="Number of guests"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Save Details
        </button>
      </div>
    </div>
  );
};

export default EventDetails;