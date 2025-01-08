import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Calendar, Users, MapPin, Trophy, Star, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const features = [
    { 
      icon: <Calendar className={`w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-blue-500'}`} />,
      title: "Easy Event Creation",
      description: "Create and manage events effortlessly with our intuitive interface"
    },
    {
      icon: <Users className={`w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-blue-500'}`} />,
      title: "Community Building",
      description: "Connect with like-minded people and build your community"
    },
    {
      icon: <MapPin className={`w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-blue-500'}`} />,
      title: "Location Services",
      description: "Find events near you with advanced location filtering"
    },
    {
      icon: <Trophy className={`w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-blue-500'}`} />,
      title: "Premium Features",
      description: "Access exclusive features and premium event content"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Event Organizer",
      content: "eventA has transformed how I manage my events. The platform is intuitive and powerful.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Regular Attendee",
      content: "I've discovered amazing events and met wonderful people through this platform.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Community Leader",
      content: "The best platform for creating and managing community events. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className={`relative w-full ${
        isDarkMode 
          ? 'bg-gradient-to-r from-gray-700 to-gray-800' 
          : 'bg-gradient-to-r from-blue-600 to-blue-800'
      } text-white py-20`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-center leading-tight mb-6">
            Create Memorable Events<br />with eventA
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-200' : 'text-blue-100'} text-center max-w-2xl mb-8`}>
            Your all-in-one platform for discovering, creating, and managing events that bring people together
          </p>
          <div className="flex gap-4">
            <button className={`px-8 py-3 bg-white rounded-full font-bold transition-colors ${
              isDarkMode 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-blue-600 hover:bg-blue-50'
            }`}>
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Why Choose eventA?
          </h2>
          <p className={`text-center mb-12 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover the features that make eventA the perfect platform for your event management needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 hover:border-gray-400' 
                    : 'bg-white border-gray-200 hover:border-blue-500/50'
                } hover:shadow-lg`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            What Our Users Say
          </h2>
          <p className={`text-center mb-12 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of satisfied users who have found success with eventA
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-900 border-gray-700 hover:border-gray-400' 
                    : 'bg-white border-gray-200 hover:border-blue-500/50'
                } hover:shadow-lg`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${
                      isDarkMode 
                        ? 'fill-gray-400 text-gray-400' 
                        : 'fill-blue-400 text-blue-400'
                    }`} />
                  ))}
                </div>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {testimonial.content}
                </p>
                <div className="mt-4">
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {testimonial.name}
                  </p>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`py-20 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-gray-700 to-gray-800' 
          : 'bg-gradient-to-r from-blue-600 to-blue-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start?</h2>
          <p className={`${isDarkMode ? 'text-gray-200' : 'text-blue-100'} mb-8 max-w-2xl mx-auto`}>
            Join our community and start creating unforgettable events today
          </p>
          <button className={`px-8 py-3 bg-white rounded-full font-bold transition-colors inline-flex items-center gap-2 ${
            isDarkMode 
              ? 'text-gray-700 hover:bg-gray-100' 
              : 'text-blue-600 hover:bg-blue-50'
          }`}>
            Create Your Event <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;