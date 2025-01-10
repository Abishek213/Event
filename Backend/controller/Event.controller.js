import Event from "../model/event.schema.js";
import User from "../model/user.schema.js";

// Create a new event
export const createEvent = async (req, res) => {
  try {

    // const user = await User.findById(req.user.id);
    //     if (!user || !user.isApproved) {
    //         return res.status(403).json({ message: 'You need to be approved to create an event.' });
    //     }
    const {
      event_name,
      description,
      event_date,
      registrationDeadline,
      time,
      location,
      price,
      category,
      tags, 
      image,
      org_ID,
      totalSlots,
      isPublic,
      status
    } = req.body;

    const newEvent = new Event({
      event_name,
      description,
      event_date,
      registrationDeadline,
      time,
      location,
      price,
      category,
      tags: tags || [],
      image,
      org_ID,
      totalSlots,
      isPublic,
      status: status || 'Pending'
    });

    const savedEvent = await newEvent.save();
    await savedEvent.populate([
      { path: "org_ID", select: "username email" },
      { path: "category", select: "categoryName" }
    ]);
    
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Error creating event", 
      error: error.message 
    });
  }
};

// Get all events
export const getEvents = async (req, res) => {
  const { search, location, category, priceRange, date, status } = req.query;

  try {
    // Build query based on parameters
    const query = {};
    if(status){
      query.status=status;
    }
    
    if (search) {
      query.$or = [
        { event_name: { $regex: search, $options: "i" }},
        { description: { $regex: search, $options: "i" }}
      ];
    }
    
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    
    if (category) {
      query.category = category; // This should now be a valid ObjectId
    }

    if (status) {
      query.status = status;
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      query.price = { $gte: min || 0 };
      if (max) query.price.$lte = max;
    }

    if (date) {
      const searchDate = new Date(date);
      query.event_date = {
        $gte: searchDate,
        $lt: new Date(searchDate.setDate(searchDate.getDate() + 1))
      };
    }

    const events = await Event.find(query)
      .populate("org_ID", "username email")
      .populate("category", "categoryName")
      .sort({ event_date: 1 });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Error fetching events", 
      error: error.message 
    });
  }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("org_ID", "username email")
      .populate("category", "categoryName")
      .populate("attendees", "username email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Error fetching event", 
      error: error.message 
    });
  }
};

export const getEventByIdName = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .select("event_name description event_date location org_ID category")
      .populate("org_ID", "username email")
      .populate("category", "categoryName")
      .populate("attendees", "username email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Error fetching event", 
      error: error.message 
    });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true,
        runValidators: true
      }
    ).populate([
      { path: "org_ID", select: "username email" },
      { path: "category", select: "categoryName" }
    ]);

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Error updating event", 
      error: error.message 
    });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ 
      message: "Event deleted successfully",
      deletedEvent 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Error deleting event", 
      error: error.message 
    });
  }
};

