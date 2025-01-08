import React, { useState } from 'react';

const UserProfile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setIsDropdownOpen(false); // Close dropdown after clicking 'Edit Profile'
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save the updated user data, e.g., send it to the server
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const bookedEvents = [
    {
      id: 1,
      name: 'Music Concert',
      date: 'Dec 20, 2024',
      time: '7:00 PM',
      location: 'City Hall, Downtown',
    },
    {
      id: 2,
      name: 'Art Exhibition',
      date: 'Jan 5, 2025',
      time: '3:00 PM',
      location: 'Art Museum, Midtown',
    },
  ];

  const pastEvents = [
    {
      id: 1,
      name: 'Jazz Night',
      date: 'Nov 10, 2024',
      time: '8:00 PM',
      location: 'Jazz Club, Uptown',
    },
    {
      id: 2,
      name: 'Tech Conference',
      date: 'Oct 25, 2024',
      time: '10:00 AM',
      location: 'Convention Center, Downtown',
    },
  ];

  const wishlistEvents = [
    {
      id: 1,
      name: 'Food Festival',
      date: 'Feb 15, 2025',
      time: '12:00 PM',
      location: 'City Park, Midtown',
    },
    {
      id: 2,
      name: 'Film Screening',
      date: 'Mar 3, 2025',
      time: '6:00 PM',
      location: 'Open Air Theater, Uptown',
    },
  ];

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen p-8 pt-20"> {/* Adjusted padding-top to prevent overlap */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg text-gray-800">
        {/* Header Section */}
        <div className="p-8 bg-gradient-to-r from-blue-600 to-purple-700 rounded-t-lg text-white flex flex-col items-center lg:flex-row lg:justify-between">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-bold">Hello {userData.name}</h1> {/* Updated greeting */}
            <p className="text-sm mt-2">
              Welcome to your profile! Manage your account and track your events here.
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex flex-col items-center lg:items-end relative">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full shadow-md border-4 border-white cursor-pointer"
              onClick={handleDropdownToggle}
            />
            <h2 className="text-lg font-semibold mt-4">{userData.name}</h2>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-16 right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-lg z-10">
                <div className="flex flex-col items-center p-4"></div>
                <ul className="divide-y divide-gray-200">
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center"
                    onClick={handleEditProfile}
                  >
                    <span className="material-icons-outlined text-gray-600 mr-2"></span>
                    My Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center">
                    <span className="material-icons-outlined text-gray-600 mr-2"></span>
                    Edit Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center">
                    <span className="material-icons-outlined text-gray-600 mr-2"></span>
                    Inbox
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center">
                    <span className="material-icons-outlined text-gray-600 mr-2"></span>
                    Settings
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center">
                    <span className="material-icons-outlined text-gray-600 mr-2"></span>
                    Help
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center">
                    <span className="material-icons-outlined text-gray-600 mr-2"></span>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Section */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Section */}
          <div className="space-y-6">
            {/* Account Info Section */}
            <div className="p-4 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">My Account</h3> {/* Reduced font size */}
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
                    value={userData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
                    value={userData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                {isEditing ? (
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200"
                      onClick={handleSaveProfile}
                    >
                      Save Profile
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition duration-200"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </button>
                )}
              </form>
            </div>

            {/* Booked Events Section */}
            <div className="p-4 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">My Booked Events</h3> {/* Reduced font size */}
              {bookedEvents.length > 0 ? (
                <div className="space-y-4">
                  {bookedEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 border border-gray-300 rounded-lg flex justify-between items-center bg-white hover:shadow-md transition duration-200"
                    >
                      <div>
                        <h4 className="text-lg font-semibold">{event.name}</h4>
                        <p className="text-sm text-gray-600">
                          {event.date} at {event.time}
                        </p>
                        <p className="text-sm text-gray-600">{event.location}</p>
                      </div>
                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200">
                        Cancel
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No events booked yet.</p>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            {/* Past Events Section */}
            <div className="p-4 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Event History</h3> {/* Reduced font size */}
              {pastEvents.length > 0 ? (
                <div className="space-y-4">
                  {pastEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 border border-gray-300 rounded-lg bg-white hover:shadow-md transition duration-200"
                    >
                      <div>
                        <h4 className="text-lg font-semibold">{event.name}</h4>
                        <p className="text-sm text-gray-600">
                          {event.date} at {event.time}
                        </p>
                        <p className="text-sm text-gray-600">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No past events found.</p>
              )}
            </div>

            {/* Wishlist Events Section */}
            <div className="p-4 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Wishlist</h3> {/* Reduced font size */}
              {wishlistEvents.length > 0 ? (
                <div className="space-y-4">
                  {wishlistEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 border border-gray-300 rounded-lg flex justify-between items-center bg-white hover:shadow-md transition duration-200"
                    >
                      <div>
                        <h4 className="text-lg font-semibold">{event.name}</h4>
                        <p className="text-sm text-gray-600">
                          {event.date} at {event.time}
                        </p>
                        <p className="text-sm text-gray-600">{event.location}</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200">
                        Book Now
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No events in wishlist.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
