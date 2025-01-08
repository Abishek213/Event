import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, X, Calendar, Tag, DollarSign, MapPin, Users } from 'lucide-react';
import { debounce } from 'lodash';
import api from '../utils/api';
import { useTheme } from '../context/ThemeContext';

const PublicEvent = () => {
  const { isDarkMode } = useTheme();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    category: '',
    priceRange: '',
    date: '',
    status: ''
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['Wedding', 'Concert', 'Sports', 'Conference', 'Workshop', 'Festival', 'Exhibition'];
  const priceRanges = ['Free', '$0-$50', '$51-$100', '$101-$200', '$200+'];
  const statuses = ['Upcoming', 'Ongoing', 'Completed'];

  const activeFilters = Object.values(filters).filter(Boolean).length;

  const debouncedFetch = useCallback(
    debounce(async (filterParams) => {
      setLoading(true);
      try {
        const response = await api.get('/events', { params: filterParams });
        setEvents(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch events');
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedFetch(filters);
    return () => debouncedFetch.cancel();
  }, [filters, debouncedFetch]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      category: '',
      priceRange: '',
      date: '',
      status: ''
    });
  };

  return (
    <div className={`min-h-screen pt-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header Section */}
      <div className={`${
        isDarkMode 
          ? 'bg-gradient-to-r from-gray-700 to-gray-800' 
          : 'bg-gradient-to-r from-blue-600 to-blue-800'
      } text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Event</h1>
          <p className={`${isDarkMode ? 'text-gray-200' : 'text-blue-100'} text-lg max-w-2xl mx-auto`}>
            Discover amazing events happening around you
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex-grow">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search for events..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500 outline-none`}
              />
            </div>
          </div>

          {/* Filter Button */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-4 rounded-lg border transition-all ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600' 
                  : 'bg-white border-gray-200 text-gray-900 hover:border-blue-500'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {activeFilters > 0 && (
                <span className={`${
                  isDarkMode ? 'bg-gray-700' : 'bg-blue-500'
                } text-white text-xs px-2 py-1 rounded-full`}>
                  {activeFilters}
                </span>
              )}
            </button>

            {activeFilters > 0 && (
              <button
                onClick={clearFilters}
                className={`flex items-center gap-2 px-6 py-4 rounded-lg border transition-all ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-red-500' 
                    : 'bg-white border-gray-200 text-red-600 hover:border-red-500'
                }`}
              >
                <X className="w-5 h-5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className={`rounded-lg border p-6 mb-8 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Filter Input Components */}
              {['location', 'category', 'priceRange', 'date', 'status'].map((filterKey) => (
                <div key={filterKey} className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {filterKey === 'location' && <MapPin className="w-4 h-4" />}
                    {filterKey === 'category' && <Tag className="w-4 h-4" />}
                    {filterKey === 'priceRange' && <DollarSign className="w-4 h-4" />}
                    {filterKey === 'date' && <Calendar className="w-4 h-4" />}
                    {filterKey === 'status' && <Users className="w-4 h-4" />}
                    {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
                  </label>
                  {filterKey === 'date' ? (
                    <input
                      type="date"
                      value={filters[filterKey]}
                      onChange={(e) => handleFilterChange(filterKey, e.target.value)}
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-gray-50 border-gray-200 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500 outline-none`}
                    />
                  ) : filterKey === 'location' ? (
                    <input
                      type="text"
                      value={filters[filterKey]}
                      onChange={(e) => handleFilterChange(filterKey, e.target.value)}
                      placeholder={`Enter ${filterKey}`}
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-blue-500 outline-none`}
                    />
                  ) : (
                    <select
                      value={filters[filterKey]}
                      onChange={(e) => handleFilterChange(filterKey, e.target.value)}
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-gray-50 border-gray-200 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500 outline-none`}
                    >
                      <option value="">{`All ${filterKey === 'priceRange' ? 'Prices' : filterKey + 's'}`}</option>
                      {(filterKey === 'category' ? categories :
                        filterKey === 'priceRange' ? priceRanges :
                        filterKey === 'status' ? statuses : []
                      ).map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Section */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
              isDarkMode ? 'border-gray-400' : 'border-blue-500'
            }`}></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className={`inline-block px-6 py-4 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-800 border border-gray-700 text-gray-300' 
                : 'bg-white border border-red-200 text-red-600'
            }`}>
              {error}
            </div>
          </div>
        ) : (
          <>
            {events.length === 0 ? (
              <div className={`text-center py-12 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg`}>
                  No events match your criteria
                </p>
                <button
                  onClick={clearFilters}
                  className={`font-medium ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-gray-300' 
                      : 'text-blue-500 hover:text-blue-600'
                  }`}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className={`group rounded-lg border transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                        : 'bg-white border-gray-200 hover:border-blue-500'
                    }`}
                  >
                    <div className="relative aspect-video">
                      <img
                        src={event.image || "/api/placeholder/400/300"}
                        alt={event.event_name}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isDarkMode 
                            ? 'bg-gray-900/80 text-gray-300' 
                            : 'bg-white/80 text-gray-900'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className={`text-xl font-semibold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {event.event_name}
                      </h3>
                      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-2`}>
                        {event.description}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className={`flex items-center gap-2 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(event.event_date).toLocaleDateString()}</span>
                        </div>
                        <div className={`flex items-center gap-2 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className={`flex items-center gap-2 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <DollarSign className="w-4 h-4" />
                          <span>${event.price}</span>
                        </div>
                      </div>
                      <button className={`mt-6 w-full py-2 rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 text-white hover:bg-gray-600' 
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PublicEvent;