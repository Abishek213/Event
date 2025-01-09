// Backend/middlewares/verifyOrganizer.js
import User from "../model/user.schema.js";
import Event from "../model/event.schema.js";

 export const verifyOrganizer = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).populate("role");
        if (user.role.role_Name !== "Organizer") {
            return res.status(403).json({ message: "Access denied: Not an organizer" });
        }
        if (!user.isApproved) {

            const eventdetails=req.body;

            const pendingEvent=new Event({
                event_name:eventdetails.event_name,
                description:eventdetails.description,
                event_date:eventdetails.event_date,
                registrationDeadline:eventdetails.registrationDeadline,
                time:eventdetails.time,
               location:eventdetails.location,
                price:eventdetails.price,
                category:eventdetails.category,
                tags:eventdetails.tags,
                image:eventdetails.image,
                org_ID:req.user.id,
                totalSlots:eventdetails.totalSlots,
                isPublic:eventdetails.isPublic,
                status:"Pending"
            });
            await pendingEvent.save();

            return res.status(403).json({
                message:"Access Denied: Awaiting for the admin approval.Your Event has been submitted for the review",
                eventdetails:pendingEvent,
            });
            // return res.status(403).json({ message: "Access denied: Awaiting approval" });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


