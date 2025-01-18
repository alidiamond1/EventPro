import { useState, useEffect } from 'react';
import { timeSlots, activityTypes, locationTypes, sampleItinerary } from '../../utils/eventPlannerData';

const ActivityForm = ({ activity, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    activity || {
      time: '',
      type: '',
      title: '',
      location: '',
      duration: 60,
      notes: ''
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: activity?.id || Date.now().toString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Time
          </label>
          <select
            value={formData.time}
            onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            required
          >
            <option value="">Select Time</option>
            {timeSlots.map(slot => (
              <option key={slot.id} value={slot.time} className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">{slot.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Activity Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            required
          >
            <option value="">Select Type</option>
            {activityTypes.map(type => (
              <option key={type.id} value={type.id} className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {type.icon} {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Location
          </label>
          <select
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            required
          >
            <option value="">Select Location</option>
            {locationTypes.map(location => (
              <option key={location.id} value={location.id} className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">{location.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Duration (minutes)
          </label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
            min="15"
            step="15"
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            rows="3"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Save Activity
        </button>
      </div>
    </form>
  );
};

const ActivityCard = ({ activity, onEdit, onDelete }) => {
  const activityType = activityTypes.find(type => type.id === activity.type);
  const location = locationTypes.find(loc => loc.id === activity.location);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{activityType?.icon}</span>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{activity.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {activity.time} ({activity.duration} mins)
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(activity)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(activity.id)}
            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
          >
            🗑️
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        Location: {location?.label}
      </p>
      {activity.notes && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {activity.notes}
        </p>
      )}
    </div>
  );
};

const EventPlanner = () => {
  const [activities, setActivities] = useState([]);
  const [editingActivity, setEditingActivity] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedActivities = localStorage.getItem('eventActivities');
    let initialActivities;
    
    try {
      initialActivities = savedActivities ? JSON.parse(savedActivities) : null;
    } catch (error) {
      console.error('Error parsing saved activities:', error);
      initialActivities = null;
    }

    if (!initialActivities || initialActivities.length === 0) {
      // Load sample itinerary for new users
      initialActivities = sampleItinerary.activities;
      localStorage.setItem('eventActivities', JSON.stringify(initialActivities));
    }
    
    setActivities(initialActivities);
  }, []);

  useEffect(() => {
    if (activities.length > 0) {
      localStorage.setItem('eventActivities', JSON.stringify(activities));
    }
  }, [activities]);

  const handleSaveActivity = (activity) => {
    if (editingActivity) {
      setActivities(prev => prev.map(a => a.id === activity.id ? activity : a));
    } else {
      setActivities(prev => [...prev, activity]);
    }
    setShowForm(false);
    setEditingActivity(null);
  };

  const handleEditActivity = (activity) => {
    setEditingActivity(activity);
    setShowForm(true);
  };

  const handleDeleteActivity = (activityId) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      setActivities(prev => prev.filter(a => a.id !== activityId));
    }
  };

  const sortedActivities = [...activities].sort((a, b) => {
    return a.time.localeCompare(b.time);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Event Timeline</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Add Activity
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <ActivityForm
            activity={editingActivity}
            onSave={handleSaveActivity}
            onCancel={() => {
              setShowForm(false);
              setEditingActivity(null);
            }}
          />
        </div>
      )}

      <div className="space-y-4">
        {sortedActivities.map(activity => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onEdit={handleEditActivity}
            onDelete={handleDeleteActivity}
          />
        ))}

        {sortedActivities.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No activities planned yet. Click "Add Activity" to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default EventPlanner;