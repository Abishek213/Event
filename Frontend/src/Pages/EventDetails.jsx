import React, { useState } from 'react';
import { 
  Calendar, MapPin, Clock, Users, DollarSign, 
  Share2, Heart, Tag, ChevronDown, ChevronUp,
  MessageSquare, Star, ArrowRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const EventDetailView = () => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Example event data - replace with your actual data
  const event = {
    id: '1',
    name: 'Summer Music Festival 2024',
    description: 'Join us for an unforgettable evening of live music featuring top artists from around the world. Experience amazing performances, great food, and a vibrant atmosphere that will keep you dancing all night long.',
    date: '2024-07-15',
    time: '18:00',
    location: 'Central Park, New York',
    price: 149.99,
    category: 'Music Festival',
    capacity: 5000,
    registered: 3240,
    organizer: {
      name: 'EventPro Productions',
      rating: 4.8,
      events: 156
    },
    images: ['/api/placeholder/800/400', '/api/placeholder/800/400', '/api/placeholder/800/400'],
    features: [
      'Live performances by 12+ artists',
      'Food and beverage vendors',
      'VIP area access available',
      'Free parking',
      'Security services'
    ],
    reviews: [
      { id: 1, user: 'Sarah M.', rating: 5, comment: 'Amazing experience! Can\'t wait for next year!' },
      { id: 2, user: 'John D.', rating: 4, comment: 'Great organization and fantastic lineup.' },
      { id: 3, user: 'Mike R.', rating: 5, comment: 'Best festival I\'ve been to this year!' }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {event.images.map((image, index) => (
          <div key={index} className={`relative ${index === 0 ? 'md:col-span-2 row-span-2' : ''}`}>
            <img
              src={image}
              alt={`Event image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-blue-500">{event.category}</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span>${event.price}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">About This Event</h2>
            <p className={`text-gray-600 ${isDescriptionExpanded ? '' : 'line-clamp-3'}`}>
              {event.description}
            </p>
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="flex items-center gap-1 text-blue-500 mt-2"
            >
              {isDescriptionExpanded ? (
                <>Show Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Read More <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </Card>

          {/* Features */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Event Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Reviews */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Reviews</h2>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">4.8</span>
                <span className="text-gray-500">(128 reviews)</span>
              </div>
            </div>
            <div className="space-y-4">
              {event.reviews.slice(0, showAllReviews ? undefined : 2).map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      {review.user[0]}
                    </div>
                    <div>
                      <p className="font-medium">{review.user}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
              {event.reviews.length > 2 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="text-blue-500 font-medium"
                >
                  {showAllReviews ? 'Show Less' : 'View All Reviews'}
                </button>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-2xl font-bold">${event.price}</p>
                <p className="text-sm text-gray-500">per ticket</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Available Spots</span>
                <span className="font-medium">{event.capacity - event.registered}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {event.registered} people registered
              </p>
            </div>
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium">
              Register Now
            </button>
          </Card>

          {/* Organizer Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Event Organizer</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                {event.organizer.name[0]}
              </div>
              <div>
                <p className="font-medium">{event.organizer.name}</p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{event.organizer.rating}</span>
                  <span>•</span>
                  <span>{event.organizer.events} events</span>
                </div>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-lg hover:bg-gray-50">
              <MessageSquare className="w-4 h-4" />
              Contact Organizer
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetailView;