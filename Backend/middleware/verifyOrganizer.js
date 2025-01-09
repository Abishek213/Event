// Backend/middlewares/verifyOrganizer.js
import User from "../model/user.schema.js";

 export const verifyOrganizer = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).populate("role");
        if (user.role.role_Name !== "Organizer") {
            return res.status(403).json({ message: "Access denied: Not an organizer" });
        }
        if (!user.isApproved) {
            return res.status(403).json({ message: "Access denied: Awaiting approval" });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


