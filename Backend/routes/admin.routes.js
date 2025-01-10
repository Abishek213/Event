// adminRoutes.js
import express from 'express';
import { getPendingEvents, approveRejectEvent } from '../controller/Admin.controller.js'; // Import the controller methods
import {protectAdmin} from '../middleware/adminMiddleware.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
// import { protectAdmin } from '../middleware/adminMiddleware.js';
const router = express.Router();



// Route for fetching all pending events for admin approval
router.get('/pending-events', authenticateUser, protectAdmin, getPendingEvents);

// Route for approving or rejecting an event
router.patch('/approve-event/:eventId', approveRejectEvent);

export default router;
