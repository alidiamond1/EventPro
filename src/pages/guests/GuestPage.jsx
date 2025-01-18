import GuestList from '../../components/guests/GuestList';

const GuestPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Guest List Manager
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your event guests, track RSVPs, and organize seating arrangements.
        </p>
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mb-8">
        <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
          Quick Tips
        </h2>
        <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-1">
          <li>Use filters to quickly find specific guests</li>
          <li>Click column headers to sort the guest list</li>
          <li>Assign tables to organize seating arrangements</li>
          <li>Track RSVPs and meal preferences</li>
        </ul>
      </div>

      {/* Main Guest List Component */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <GuestList />
      </div>

      {/* Help Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Managing RSVPs</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Keep track of guest responses and update their status accordingly.
            Send reminders to guests who haven't responded yet.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Seating Arrangements</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Organize guests by groups and assign them to tables. The system will
            help you optimize seating based on relationships and preferences.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Dietary Requirements</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Track special meal requirements and dietary restrictions to ensure
            all guests are accommodated during the event.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestPage;