// adminController.js
import Event from '../model/event.schema.js';

// Controller to fetch all pending events for admin approval
export const getPendingEvents = async (req, res) => {
  try {
    const pendingEvents = await Event.find({ status: 'Pending' }).populate('org_ID', 'name');
    return res.json(pendingEvents);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Controller to approve or reject an event
export const approveRejectEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { action } = req.body; // action can be 'approve' or 'reject'

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ message: 'Invalid action' });
    }

    // Find the event by ID
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update the event status based on the admin's action
    event.status = action === 'approve' ? 'Approved' : 'Rejected';
    await event.save();

    return res.json({ message: `Event ${event.status} successfully`, event });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
