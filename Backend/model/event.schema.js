import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  event_name: { 
    type: String, 
    required: true,
    trim: true 
  },
  description: { 
    type: String, 
    required: true,
    trim: true 
  },
  event_date: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(date) {
        return date > new Date();
      },
      message: 'Event date must be in the future'
    }
  },
  registrationDeadline: {
    type: Date,
    required: true,
    validate: {
      validator: function(date) {
        return date < this.event_date;
      },
      message: 'Registration deadline must be before event date'
    }
  },
  time: { type: String, required: true },
  location: { type: String, required: true, trim: true },
  price: { 
    type: Number, 
    required: true,
    min: [0, 'Price cannot be negative']
  },
  category: { 
    type: String, 
    required: true,
    enum: ['trending', 'featured', 'regular'] 
  },
  tags: [{ type: String, trim: true }],
  image: { type: String },
  org_ID: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: function(v) {
        return this.attendees.length <= this.totalSlots;
      },
      message: 'Event has reached maximum capacity'
    }
  }],
  totalSlots: { 
    type: Number, 
    required: true,
    min: [1, 'Total slots must be at least 1']
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  status: { 
    type: String, 
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled','Pending', 'Approved', 'Rejected'],
    default: 'upcoming'
  }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;