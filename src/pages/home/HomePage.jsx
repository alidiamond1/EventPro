import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
    <div className="w-12 h-12 mb-4 text-blue-600 dark:text-blue-400">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

const HomePage = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Venue Search',
      description: 'Find the perfect venue for your event with our comprehensive search tools.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Guest Management',
      description: 'Easily manage your guest list, RSVPs, and seating arrangements.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Theme Ideas',
      description: 'Get creative theme suggestions and planning tips from our AI assistant.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Event Planning',
      description: 'Plan your event timeline and manage all details in one place.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl transition-colors duration-200">
          <span className="block">Plan Your Perfect Event</span>
          <span className="block text-blue-600 dark:text-blue-400">with EventPro</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl transition-colors duration-200">
          Streamline your event planning process with our all-in-one platform. From venue selection to guest management, we've got you covered.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          {!user ? (
            <>
              <Link
                to="/register"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200 md:text-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 md:text-lg"
              >
                Sign In
              </Link>
            </>
          ) : (
            <Link
              to="/planner"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200 md:text-lg"
            >
              Start Planning
            </Link>
          )}
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-200">
              Everything You Need to Plan Your Event
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 transition-colors duration-200">
              Our comprehensive suite of tools makes event planning simple and enjoyable.
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 dark:bg-blue-700 mt-12 transition-colors duration-200">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to start planning?</span>
            <span className="block">Create your event today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-100 dark:text-blue-200">
            Join thousands of successful event planners who trust EventPro.
          </p>
          {!user && (
            <Link
              to="/register"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 dark:bg-gray-100 dark:hover:bg-gray-200 transition-colors duration-200 sm:w-auto"
            >
              Sign Up Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;