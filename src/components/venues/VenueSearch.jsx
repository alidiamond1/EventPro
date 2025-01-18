import { useState, useEffect } from 'react';
import { venues, vendors, eventTypes, priceRanges } from '../../utils/mockData';

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('venueSearchPreferences');
    return saved ? JSON.parse(saved) : {
      eventType: '',
      guestCount: '',
      budget: '',
      location: '',
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('venueSearchPreferences', JSON.stringify(formData));
    onSearch(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Event Type
          </label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          >
            <option value="">Select Type</option>
            {eventTypes.map(type => (
              <option key={type.id} value={type.id} className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">{type.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Guest Count
          </label>
          <input
            type="number"
            name="guestCount"
            value={formData.guestCount}
            onChange={handleChange}
            placeholder="Number of guests"
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Budget Range
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          >
            <option value="">Select Budget</option>
            {priceRanges.map(range => (
              <option key={range.id} value={range.id} className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {range.label} (Up to ${range.maxPrice})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Search Venues
        </button>
      </div>
    </form>
  );
};

const VenueCard = ({ venue }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
      {/* Placeholder for venue image */}
      <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-700">
        <span className="text-4xl">🏰</span>
      </div>
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{venue.name}</h3>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {venue.priceRange}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{venue.location}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{venue.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Capacity: {venue.capacity}
        </span>
        <div className="flex items-center">
          <span className="text-yellow-400 mr-1">★</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">{venue.rating}</span>
        </div>
      </div>
      <div className="mt-4">
        <button className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>
  </div>
);

const VenueSearch = () => {
  const [searchResults, setSearchResults] = useState(venues);
  const [filters, setFilters] = useState({
    eventType: '',
    priceRange: '',
    location: '',
  });

  const handleSearch = (searchData) => {
    let filtered = venues.filter(venue => {
      if (searchData.eventType && venue.type !== searchData.eventType) return false;
      if (searchData.guestCount && venue.capacity < parseInt(searchData.guestCount)) return false;
      if (searchData.budget && venue.priceRange !== searchData.budget) return false;
      if (searchData.location && !venue.location.toLowerCase().includes(searchData.location.toLowerCase())) return false;
      return true;
    });

    setSearchResults(filtered);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Find Your Perfect Venue</h2>
      <SearchForm onSearch={handleSearch} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map(venue => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>

      {searchResults.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            No venues found matching your criteria. Try adjusting your search filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default VenueSearch;