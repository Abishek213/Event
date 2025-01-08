const Stats = () => {
    return (
      <div className="container mx-auto py-16">
        <h2 className="text-4xl font-bold text-center mb-12">eVENTA Platform Stats</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          
          <div className="bg-blue-800 text-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h3 className="text-2xl font-bold mb-2">Wedding Vendors</h3>
            <p className="text-4xl animate-pulse">50+</p>
          </div>

          <div className="bg-blue-300 text-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h3 className="text-2xl font-bold mb-2">Wedding Venues</h3>
            <p className="text-4xl animate-pulse">500+</p>
          </div>
  
          <div className="bg-green-600 text-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h3 className="text-2xl font-bold mb-2">Users</h3>
            <p className="text-4xl animate-pulse">10,000+</p>
          </div>
  
          <div className="bg-red-600 text-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h3 className="text-2xl font-bold mb-2">Events</h3>
            <p className="text-4xl animate-pulse">1,200+</p>
          </div>
        </div>
      </div>
    );
};

export default Stats;
