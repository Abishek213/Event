import React, { useEffect } from 'react';
import { Mail, Phone, MessageSquare, Send, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { isDarkMode } = useTheme();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      content: "+1 (555) 123-4567",
      description: "Monday to Friday, 9am to 6pm"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "support@eventa.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office",
      content: "123 Event Street",
      description: "New York, NY 10001"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-white to-gray-50 text-gray-900'} pt-16`}>
      {/* Header Banner */}
      <div className={`bg-gradient-to-r ${isDarkMode ? 'from-gray-700 to-gray-800' : 'from-blue-600 to-blue-800'} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Have questions about eventA? We're here to help and would love to hear from you
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Send us a Message</h2>
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your Name</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'} outline-none transition-colors`}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                  <input
                    type="email"
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'} outline-none transition-colors`}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
                  <input
                    type="tel"
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'} outline-none transition-colors`}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                  <textarea
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'} outline-none transition-colors resize-none`}
                    placeholder="How can we help you?"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2`}
              >
                Send Message
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{info.title}</h3>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{info.content}</p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How do I create an event?</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Sign up as an organizer and use our intuitive event creation tool.</p>
                </div>
                <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What payment methods do you accept?</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>We accept all major credit cards and digital payment methods.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
