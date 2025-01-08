import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useParams, useNavigate } from "react-router-dom";
import { useSidebar } from '../../context/SidebarContext';

const OrganizerDashboard = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  
  const formatTabName = (tabName) => {
    if (!tabName) return "Overview";
    return tabName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const [activeTab, setActiveTab] = useState(formatTabName(tab));

  useEffect(() => {
    setActiveTab(formatTabName(tab));
  }, [tab]);

  const analyticsData = [
    { month: 'Jan', events: 4, attendees: 120, revenue: 2400 },
    { month: 'Feb', events: 3, attendees: 98, revenue: 1800 },
    { month: 'Mar', events: 5, attendees: 150, revenue: 3200 },
    { month: 'Apr', events: 6, attendees: 200, revenue: 4000 },
  ];

  const upcomingEvents = [
    { id: 1, name: "Tech Conference 2025", date: "Mar 15, 2025", attendees: 250, status: "Upcoming" },
    { id: 2, name: "Music Festival", date: "Apr 1, 2025", attendees: 500, status: "Open" },
    { id: 3, name: "Art Exhibition", date: "Apr 10, 2025", attendees: 150, status: "Draft" },
  ];

  const handleCreateEvent = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const eventData = {
      event_name: formData.get("event_name"),
      description: formData.get("description"),
      event_date: formData.get("event_date"),
      registrationDeadline: formData.get("registrationDeadline"),
      time: formData.get("time"),
      location: formData.get("location"),
      price: formData.get("price"),
      category: formData.get("category"),
      tags: formData.get("tags").split(",").map(tag => tag.trim()),
      image: formData.get("image"),
      org_ID: "67738fad103ca82546f5dab2",
      totalSlots: formData.get("totalSlots"),
      isPublic: formData.get("isPublic")==="on",
    };

    try {
      const token = localStorage.getItem('token');
      console.log("Token:", token);
      const response = await fetch("http://localhost:4001/api/v1/events/create", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify(eventData)
      });

      if (response.ok) {
        alert("Event created successfully!");
        navigate("/orgdb/my-events");
      } else {
        const result = await response.json();
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred while creating the event.");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {[
                { title: "Total Events", value: "18", change: "+12% from last month", color: "green" },
                { title: "Total Revenue", value: "$11,400", change: "+8% from last month", color: "green" },
                { title: "Total Attendees", value: "568", change: "+15% from last month", color: "green" },
                { title: "Active Events", value: "7", change: "Currently running", color: "blue" }
              ].map(({ title, value, change, color }) => (
                <div key={title} className="p-6 bg-white rounded-lg shadow">
                  <h3 className="text-sm text-gray-500">{title}</h3>
                  <p className="text-2xl font-bold">{value}</p>
                  <span className={`text-${color}-500 text-sm`}>{change}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-xl font-semibold">Event Analytics</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="events" stroke="#8884d8" />
                  <Line yAxisId="left" type="monotone" dataKey="attendees" stroke="#82ca9d" />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-xl font-semibold">Upcoming Events</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{event.name}</h3>
                    <p className="text-gray-500">{event.date}</p>
                    <p className="text-sm">Attendees: {event.attendees}</p>
                    <span className={`inline-block px-2 py-1 rounded text-sm ${
                      event.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' :
                      event.status === 'Open' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Create Event":
        return (
          <form className="p-6 space-y-6 bg-white rounded-lg shadow" onSubmit={handleCreateEvent}>
            <h2 className="mb-4 text-2xl font-bold">Create New Event</h2>
            
            <div>
              <h3 className="mb-2 text-lg font-semibold">Event Details</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input name="event_name" type="text" placeholder="Event Name" className="w-full p-2 border rounded" required />
                <select name="category" className="w-full p-2 border rounded" required>
                  <option value="">Select Category</option>
                  {["Trending", "Educational", "Entertainment", "Sports"].map(cat => (
                    <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                  ))}
                </select>
                <textarea name="description" placeholder="Event Description" className="w-full col-span-2 p-2 border rounded" rows="4" required />
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Date & Time</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input name="event_date" type="date" className="w-full p-2 border rounded" required />
                <input name="time" type="time" className="w-full p-2 border rounded" required />
                <input name="registrationDeadline" type="date" className="w-full col-span-2 p-2 border rounded" required />
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Location & Pricing</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input name="location" type="text" placeholder="Location" className="w-full p-2 border rounded" required />
                <input name="price" type="number" placeholder="Price (USD)" className="w-full p-2 border rounded" required />
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Additional Options</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input name="tags" type="text" placeholder="Tags (comma-separated)" className="w-full p-2 border rounded" />
                <input name="image" type="text" placeholder="Image URL" className="w-full p-2 border rounded" />
                <input name="totalSlots" type="number" placeholder="Total Slots" className="w-full p-2 border rounded" required />
                <div className="flex items-center">
                  <input id="isPublic" name="isPublic" type="checkbox" className="mr-2" />
                  <label htmlFor="isPublic">Make event public</label>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-600">
              Create Event
            </button>
          </form>
        );

      default:
        return <div className="p-6 bg-white rounded-lg shadow">{activeTab} content</div>;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
      <div className="p-8">
        <h1 className="mb-6 text-2xl font-bold">{activeTab}</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default OrganizerDashboard;