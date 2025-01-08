
import express from 'express';
import { createRole, getAllRoles, verifyRole } from '../controller/role.controller.js'; // Adjust path to controller

const router = express.Router();
router.post('/create', createRole);
router.get('/', getAllRoles);
router.post('/verify', verifyRole);

export default router;
