import Event from '../model/event.schema.js';
import User from '../model/user.schema.js';
import Category from '../model/categories.schema.js';

const events = [
  {
    event_name: 'Summer Music Festival',
    description: 'A day filled with live music performances from local and international artists',
    event_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    registrationDeadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    time: '12:00 PM',
    location: 'Central Park',
    price: 49.99,
    categoryName: 'Festival',
    image: 'festival.jpg',
    totalSlots: 1000,
    status: 'upcoming'
  },
  {
    event_name: 'Tech Conference 2024',
    description: 'Annual technology conference featuring industry leaders and innovative showcases',
    event_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    registrationDeadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
    time: '9:00 AM',
    location: 'Convention Center',
    price: 299.99,
    categoryName: 'Education',
    image: 'tech-conf.jpg',
    totalSlots: 500,
    status: 'upcoming'
  },
  {
    event_name: 'Yoga Workshop',
    description: 'Beginner-friendly yoga workshop with certified instructors',
    event_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    registrationDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    time: '8:00 AM',
    location: 'Wellness Center',
    price: 25.00,
    categoryName: 'Sports',
    image: 'yoga.jpg',
    totalSlots: 30,
    status: 'upcoming'
  },
  {
    event_name: 'Art Expo 2025',
    description: 'An exhibition showcasing contemporary art pieces and sculptures from global artists.',
    event_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    registrationDeadline: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000),
    time: '10:00 AM',
    location: 'Downtown Art Gallery',
    price: 20.00,
    categoryName: 'Festival',
    image: 'art-expo.jpg',
    totalSlots: 200,
    status: 'upcoming'
  },
  {
    event_name: 'Cooking Masterclass',
    description: 'A hands-on cooking session with a renowned celebrity chef.',
    event_date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    registrationDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    time: '3:00 PM',
    location: 'Culinary Institute',
    price: 75.00,
    categoryName: 'Food',
    image: 'masterclass.jpg',
    totalSlots: 50,
    status: 'upcoming'
  },
  {
    event_name: 'Book Fair 2025',
    description: 'A gathering of book enthusiasts with author signings, workshops, and discounts.',
    event_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    registrationDeadline: new Date(Date.now() + 85 * 24 * 60 * 60 * 1000),
    time: '11:00 AM',
    location: 'City Library',
    price: 10.00,
    categoryName: 'Education',
    image: 'book-fair.jpg',
    totalSlots: 300,
    status: 'upcoming'
  }  
];

const seedEvents = async () => {
  try {
    // Find the organizer user
    const organizer = await User.findOne({ email: 'organizer@example.com' });
    
    if (!organizer) {
      console.log("Organizer user not found. Please run user seeder first.");
      return;
    }

    // Clear existing events
    const existingEvents = await Event.find({});
    if (existingEvents.length > 0) {
      console.log('Events already seeded.');
      return;
    }

    // Get all categories
    const categories = await Category.find({});
    if (categories.length === 0) {
      console.log("Categories not found. Please run category seeder first.");
      return;
    }

    // Add organizer ID and category ID to each event
    const eventsWithReferences = events.map(event => {
      const categoryDoc = categories.find(cat => cat.categoryName === event.categoryName);
      if (!categoryDoc) {
        throw new Error(`Category ${event.categoryName} not found`);
      }
      
      // Remove categoryName and add category ID
      const { categoryName, ...eventWithoutCategoryName } = event;
      return {
        ...eventWithoutCategoryName,
        org_ID: organizer._id,
        category: categoryDoc._id
      };
    });

    // Create the events
    await Event.insertMany(eventsWithReferences);
    console.log('Events seeded successfully!');

  } catch (error) {
    console.error('Error seeding events:', error);
  }
};

export default seedEvents;