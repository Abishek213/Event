// adminRoutes.js
import express from 'express';
import { getPendingEvents, approveRejectEvent } from '../controller/Admin.controller.js'; // Import the controller methods
import {protectAdmin} from '../middleware/adminMiddleware.js';
const router = express.Router();


router.use(protectAdmin);
// Route for fetching all pending events for admin approval
router.get('/pending-events', getPendingEvents);

// Route for approving or rejecting an event
router.post('/approve-event/:eventId', approveRejectEvent);

export default router;
