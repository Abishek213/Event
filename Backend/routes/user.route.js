import express from "express";
import {signup,login} from "../controller/user.controller.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { requestApproval,checkApproval } from "../controller/user.controller.js";
const router =express.Router();


router.post("/signup",signup);
router.post("/login",login);

// Request approval (user will be able to request admin approval)
router.post('/request-approval', authenticateUser, requestApproval);

// Check if the user is approved
router.get('/check-approval', authenticateUser, checkApproval);


export default router;