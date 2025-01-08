import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Users, TrendingUp, Heart, Star, MapPin, Share2, Clock, Search, Filter, X } from 'lucide-react';
import { debounce } from 'lodash';
import { useTheme } from '../../context/ThemeContext';
import api from '../../utils/api';

const UserDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeEvent, setActiveEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    priceRange: '',
    date: '',
    status: ''
  });

  const { isDarkMode } = useTheme();

  const themeClasses = {
    layout: isDarkMode 
      ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
      : 'bg-gradient-to-br from-blue-50 to-white',
    text: isDarkMode ? 'text-gray-100' : 'text-gray-800',
    textMuted: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    card: isDarkMode 
      ? 'bg-gray-800/50 border-gray-700' 
      : 'bg-white/50 border-gray-200',
    button: isDarkMode 
      ? 'bg-purple-600 hover:bg-purple-500' 
      : 'bg-purple-500 hover:bg-purple-600',
    input: isDarkMode 
      ? 'bg-gray-800 border-gray-700 text-white' 
      : 'bg-white border-gray-200 text-gray-900',
    cardHover: isDarkMode 
      ? 'hover:border-gray-600' 
      : 'hover:border-purple-200',
    filterBtn: isDarkMode 
      ? 'hover:bg-gray-700' 
      : 'hover:bg-gray-50'
  };

  const categories = [
    { id: 'all', name: 'All Events', icon: Calendar },
    { id: 'trending', name: 'Trending', icon: TrendingUp },
    { id: 'featured', name: 'Featured', icon: Star },
    { id: 'regular', name: 'Regular', icon: Users }
  ];

  const priceRanges = ['Free', '$0-$50', '$51-$100', '$101-$200', '$200+'];
  const statuses = ['Upcoming', 'Ongoing', 'Completed'];

  const debouncedFetch = useCallback(
    debounce(async (category, filterParams) => {
      setLoading(true);
      try {
        const response = await api.get('/events', {
          params: {
            category: category !== 'all' ? category : undefined,
            ...filterParams
          }
        });
        setEvents(response.data);
        
        // Fetch user's wishlist
        const userId = localStorage.getItem('userId');
        if (userId) {
          const userResponse = await api.get(`/users/${userId}/wishlist`);
          setWishlist(new Set(userResponse.data.map(event => event._id)));
        }
        
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedFetch(selectedCategory, filters);
    return () => debouncedFetch.cancel();
  }, [selectedCategory, filters, debouncedFetch]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      priceRange: '',
      date: '',
      status: ''
    });
  };

  const handleWishlist = async (eventId) => {
    try {
      const newWishlist = new Set(wishlist);
      if (wishlist.has(eventId)) {
        await api.delete(`/events/${eventId}/wishlist`);
        newWishlist.delete(eventId);
      } else {
        await api.post(`/events/${eventId}/wishlist`);
        newWishlist.add(eventId);
      }
      setWishlist(newWishlist);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleShare = async (eventId) => {
    try {
      const shareData = {
        title: 'Event Share',
        text: 'Check out this event!',
        url: `${window.location.origin}/events/${eventId}`
      };
      await navigator.share(shareData);
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-screen ${themeClasses.layout} ${themeClasses.text}`}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">Error: {error}</div>
    );
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className={`min-h-screen ${themeClasses.layout}`}>
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col space-y-4 mb-8">
          {/* Category buttons */}
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? `${themeClasses.button} text-white`
                      : `${themeClasses.card} ${themeClasses.text}`
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search and filter section */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${themeClasses.textMuted}`} />
                <input
                  type="text"
                  placeholder="Search for events..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-lg border ${themeClasses.input} focus:ring-2 focus:ring-purple-500 outline-none`}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-4 rounded-lg border ${themeClasses.card} ${themeClasses.filterBtn}`}
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className={`${themeClasses.button} text-white text-xs px-2 py-1 rounded-full`}>
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className={`flex items-center gap-2 px-6 py-4 rounded-lg border ${themeClasses.card} ${themeClasses.filterBtn}`}
                >
                  <X className="w-5 h-5" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className={`${themeClasses.card} rounded-lg border p-6`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries({
                  location: { icon: MapPin, type: 'text', placeholder: 'Enter location' },
                  priceRange: { icon: Star, type: 'select', options: priceRanges },
                  date: { icon: Calendar, type: 'date' },
                  status: { icon: Clock, type: 'select', options: statuses }
                }).map(([key, config]) => (
                  <div key={key} className="space-y-2">
                    <label className={`flex items-center gap-2 text-sm font-medium ${themeClasses.text}`}>
                      <config.icon className="w-4 h-4" />
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    {config.type === 'select' ? (
                      <select
                        value={filters[key]}
                        onChange={(e) => handleFilterChange(key, e.target.value)}
                        className={`w-full p-3 rounded-lg border ${themeClasses.input}`}
                      >
                        <option value="">All {key}s</option>
                        {config.options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : config.type === 'date' ? (
                      <input
                        type="date"
                        value={filters[key]}
                        onChange={(e) => handleFilterChange(key, e.target.value)}
                        className={`w-full p-3 rounded-lg border ${themeClasses.input}`}
                      />
                    ) : (
                      <input
                        type="text"
                        value={filters[key]}
                        onChange={(e) => handleFilterChange(key, e.target.value)}
                        placeholder={config.placeholder}
                        className={`w-full p-3 rounded-lg border ${themeClasses.input}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div
              key={event._id}
              className={`${themeClasses.card} rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer ${themeClasses.cardHover}`}
              onClick={() => setActiveEvent(activeEvent === event._id ? null : event._id)}
            >
              <div className="relative">
                <img
                  src={event.image || '/api/placeholder/600/400'}
                  alt={event.event_name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button 
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlist(event._id);
                    }}
                  >
                    <Heart 
                      className={`h-4 w-4 ${wishlist.has(event._id) ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                    />
                  </button>
                  <button 
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(event._id);
                    }}
                  >
                    <Share2 className="h-4 w-4 text-white" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
                    ${event.price}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Clock className={`h-4 w-4 ${themeClasses.textMuted}`} />
                    <span className={`text-sm ${themeClasses.textMuted}`}>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className={`h-4 w-4 ${themeClasses.textMuted}`} />
                    <span className={`text-sm ${themeClasses.textMuted}`}>
                      {event.attendees?.length || 0}/{event.totalSlots}
                    </span>
                  </div>
                </div>
                <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>{event.event_name}</h3>
                <div className="flex items-center space-x-2">
                  <MapPin className={`h-4 w-4 ${themeClasses.textMuted}`} />
                  <span className={`text-sm ${themeClasses.textMuted}`}>{event.location}</span>
                </div>
                {activeEvent === event._id && (
                  <div className="mt-4">
                    <p className={`text-sm ${themeClasses.textMuted}`}>{event.description}</p>
                    <button 
                      className={`mt-4 w-full py-2 ${themeClasses.button} text-white rounded-lg`}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/events/${event._id}`;
                      }}
                    >
                      View Details
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;