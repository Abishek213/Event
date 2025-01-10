// adminController.js
import Event from '../model/event.schema.js';

// Controller to fetch all pending events for admin approval
// Get pending events for approval (Admin view)
export const getPendingEvents = async (req, res) => {
    try {
      const pendingEvents = await Event.find({ status: 'Pending' })
        .populate("org_ID", "username email")
        .populate("category", "categoryName");
  
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
export const approveRejectEvent = async (req, res) => {
    const { eventId } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'
  
    try {
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      // Update event status based on admin's decision
      event.status = status === 'approved' ? 'Approved' : 'Rejected';
      await event.save();
  
      res.status(200).json({ message: `Event ${status} successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error updating event status",
        error: error.message
      });
    }
  };
  
