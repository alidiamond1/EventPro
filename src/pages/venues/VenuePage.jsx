import VenueSearch from '../../components/venues/VenueSearch';

const VenuePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Venues & Vendors
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Find the perfect venue and vendors for your event. Browse our curated selection
          of spaces and service providers to make your event unforgettable.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Available Venues', value: '150+' },
          { label: 'Trusted Vendors', value: '75+' },
          { label: 'Happy Customers', value: '10k+' },
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

      {/* Main Search Section */}
      <VenueSearch />

      {/* Additional Information */}
      <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Why Choose Our Venues?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Verified Venues',
              description: 'All venues are personally verified for quality and safety.',
              icon: '✓',
            },
            {
              title: 'Best Price Guarantee',
              description: 'We match any comparable venue price you find.',
              icon: '💰',
            },
            {
              title: '24/7 Support',
              description: 'Our team is always here to help with your booking.',
              icon: '🌟',
            },
          ].map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="text-2xl text-blue-600 dark:text-blue-400">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenuePage;