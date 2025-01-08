import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import eventA from "../assets/images/eventA.png";
import { useTheme } from '../context/ThemeContext';
import { jwtDecode } from "jwt-decode";
import { 
  Bell, User, LogOut, Settings, ChevronDown,
  Sun, Moon, Plus, Menu, Home, Phone, Info,
  LayoutDashboard, Calendar, BarChart3, HelpCircle, List
} from 'lucide-react';

const NavBar = () => {
  const [sticky, setSticky] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, setIsDarkMode } = useTheme();
  
  
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const themeClasses = {
    nav: `fixed w-full top-0 z-50 transition-all duration-300 ${
      sticky 
        ? (isDarkMode ? 'bg-gray-900/95' : 'bg-white/95') 
        : (isDarkMode ? 'bg-gray-900' : 'bg-white')
    } border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-lg`,
    text: isDarkMode ? 'text-gray-100' : 'text-gray-800',
    textMuted: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    button: `bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300`,
    dropdownMenu: `absolute right-0 mt-2 w-56 rounded-xl ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    } shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`
  };

  const notifications = [
    { id: 1, message: "New event registration", time: "2 mins ago" },
    { id: 2, message: "Payment received", time: "1 hour ago" },
    { id: 3, message: "Event reminder", time: "2 hours ago" },
  ];

  const tabs = [
    { label: "Overview", icon: BarChart3 },
    { label: "Create Event", icon: Plus },
    { label: "My Events", icon: List },
    { label: "Settings", icon: Settings },
    { label: "Help", icon: HelpCircle },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      try {
        const decodedToken = jwtDecode(isAuthenticated);
        setUser(decodedToken.user);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
      if (showNotifications && !event.target.closest('.notifications-dropdown')) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen, showNotifications]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/loginsignup';
  };

  const getNavigationItems = () => {
    const commonItems = [
      { to: "/", icon: Home, text: "Home" },
      { to: "/contact", icon: Phone, text: "Contact" },
      { to: "/about", icon: Info, text: "About" }
    ];

    if (!isAuthenticated) {
      commonItems.splice(1, 0, {
        to: "/event",
        icon: Calendar,
        text: "Events"
      });
    }

    return commonItems;
  };

  const OrganizerNavBar = () => (
    <div className="flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "w-64" : "w-16"} bg-white shadow-lg h-screen fixed transition-all ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-2xl font-semibold transition-all ${isSidebarOpen ? "block" : "hidden"}`}>
            Event<span className="text-blue-400">A</span>
          </h1>
          <Menu 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="cursor-pointer"
          />
        </div>
        <ul className="space-y-4 mt-8">
          {tabs.map((tab) => (
            <li
              key={tab.label}
              className={`flex items-center space-x-3 px-6 py-2 cursor-pointer ${
                activeTab === tab.label 
                  ? "bg-blue-500 text-white" 
                  : isDarkMode 
                    ? "hover:bg-gray-800" 
                    : "hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveTab(tab.label);
                navigate(`/orgdb/${tab.label.toLowerCase().replace(' ', '-')}`);
              }}
            >
              <tab.icon className="w-5 h-5" />
              <span className={`${isSidebarOpen ? "block" : "hidden"}`}>{tab.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Header */}
      <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className={`text-2xl font-semibold ${themeClasses.text}`}>
                EventA Organizer Dashboard
              </h1>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-lg ${
                    isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5 text-gray-300" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-600" />
                  )}
                </button>

                <div className="relative notifications-dropdown">
                  <button
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setIsProfileOpen(false);
                    }}
                    className={`p-2 hover:bg-gray-100 rounded-full relative ${
                      isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Bell className={`w-6 h-6 ${themeClasses.text}`} />
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      3
                    </span>
                  </button>
                  
                  {showNotifications && (
                    <div className={themeClasses.dropdownMenu}>
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-2 ${
                            isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                          }`}
                        >
                          <p className={`text-sm ${themeClasses.text}`}>
                            {notification.message}
                          </p>
                          <p className={`text-xs ${themeClasses.textMuted}`}>
                            {notification.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative profile-dropdown">
                  <button
                    onClick={() => {
                      setIsProfileOpen(!isProfileOpen);
                      setShowNotifications(false);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.fullname?.split(' ').map(name => name[0]).join('') || 'U'}
                      </span>
                    </div>
                  </button>
                  
                  {isProfileOpen && (
                    <div className={themeClasses.dropdownMenu}>
                      <div className={`p-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <p className={`text-sm font-medium ${themeClasses.text}`}>
                          {user?.fullname || 'User'}
                        </p>
                        <p className={`text-sm ${themeClasses.textMuted}`}>
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>
                      <div className="p-2">
                        <Link 
                          to="/profile" 
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                            isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                          } ${themeClasses.text}`}
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                        <Link 
                          to="/settings" 
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                            isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                          } ${themeClasses.text}`}
                        >
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 ${
                            isDarkMode ? 'hover:bg-red-900/20' : 'hover:bg-red-50'
                          }`}
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const RegularNavBar = () => (
    <div className={themeClasses.nav}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={eventA} alt="logo" className={`h-12 w-auto ${isDarkMode ? 'invert' : ''}`} />
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center">
              <ul className="flex items-center gap-6">
                {getNavigationItems().map((item) => (
                  <li key={item.to}>
                    <Link 
                      to={item.to} 
                      className={`flex items-center gap-2 ${themeClasses.textMuted} hover:text-blue-600`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg ${
                isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {!isAuthenticated ? (
              <Link
                to="/loginsignup"
                className={`px-6 py-2 rounded-full ${themeClasses.button}`}
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                {userRole === 'User' && (
                  <button
                    onClick={() => navigate('/userdb')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full ${themeClasses.button}`}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </button>
                )}

                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`p-2 rounded-lg ${
                      isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.fullname?.split(' ').map(name => name[0]).join('') || 'U'}
                      </span>
                    </div>
                  </button>

                  {isProfileOpen && (
                   <div className={themeClasses.dropdownMenu}>
                   <div className={`p-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                     <p className={`text-sm font-medium ${themeClasses.text}`}>
                       {user?.fullname || 'User'}
                     </p>
                     <p className={`text-sm ${themeClasses.textMuted}`}>
                       {user?.email || 'user@example.com'}
                     </p>
                   </div>
                   <div className="p-2">
                     <Link 
                       to="/profile" 
                       className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                         isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                       } ${themeClasses.text}`}
                     >
                       <User className="h-4 w-4" />
                       <span>Profile</span>
                     </Link>
                     <Link 
                       to="/settings" 
                       className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                         isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                       } ${themeClasses.text}`}
                     >
                       <Settings className="h-4 w-4" />
                       <span>Settings</span>
                     </Link>
                     <button 
                       onClick={handleLogout}
                       className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 ${
                         isDarkMode ? 'hover:bg-red-900/20' : 'hover:bg-red-50'
                       }`}
                     >
                       <LogOut className="h-4 w-4" />
                       <span>Sign Out</span>
                     </button>
                   </div>
                 </div>
               )}
             </div>
           </div>
         )}

         <div className="lg:hidden">
           <div className="dropdown dropdown-end">
             <button tabIndex={0} className={`btn btn-ghost ${themeClasses.textMuted}`}>
               <Menu className="h-5 w-5" />
             </button>
             <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 ${
               isDarkMode ? 'bg-gray-900' : 'bg-white'
             }`}>
               {getNavigationItems().map((item) => (
                 <li key={item.to}>
                   <Link to={item.to} className={themeClasses.textMuted}>
                     <item.icon className="h-4 w-4" />
                     {item.text}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
);

if (location.pathname.startsWith("/admindb")) {
 return null;
}

return isAuthenticated && userRole === 'Organizer' ? <OrganizerNavBar /> : <RegularNavBar />;
};

export default NavBar;