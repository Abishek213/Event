import Event from '../model/event.schema.js';
import User from '../model/user.schema.js';

// Controller to fetch all pending events for admin approval
// Get pending events for approval (Admin view)
export const getPendingEvents = async (req, res) => {
    try {
        const pendingEvents = await Event.find({ status: 'Pending' })
            .populate("org_ID", "username email") // Populating the organizer details
            .populate("category", "categoryName"); // Populating the category

        res.status(200).json(pendingEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching pending events",
            error: error.message
        });
    }
};

// Controller to approve or reject an event
// Approve or Reject an event
// Controller to approve or reject an event
export const approveRejectEvent = async (req, res) => {
  const { eventId } = req.params;
  const { status } = req.body; // 'approved' or 'rejected'

  try {
      // Validate the status value and map to correct format
      if (status !== 'approved' && status !== 'rejected') {
          return res.status(400).json({ message: "Invalid status, must be 'approved' or 'rejected'" });
      }

      const event = await Event.findById(eventId);

      if (!event) {
          return res.status(404).json({ message: "Event not found" });
      }

      // Update event status based on admin's decision
      event.status = status === 'approved' ? 'Approved' : 'Rejected';  // Map to 'Approved' or 'Rejected'

      if (status === 'approved') {
        event.isPublic = true;
    }else{
      event.isPublic = false;  // Set isPublic to false for the event when it is rejected
    }
    
      await event.save();

      // If the event is approved, also update the organizer's isApproved field to true
      const user = await User.findById(event.org_ID);
      if (user) {
          if (status === 'approved') {
              user.isApproved = true;  // Set isApproved to true for the organizer
          }
          //  else {
          //     user.isApproved = false;  // Set isApproved to false for the organizer when the event is rejected
          // }
          await user.save();
      } else {
          return res.status(404).json({ message: "Organizer not found" });
      }

      res.status(200).json({ message: `Event ${status} successfully` });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          message: "Error updating event status",
          error: error.message
      });
  }
};
