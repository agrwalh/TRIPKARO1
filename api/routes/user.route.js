import express from 'express';
import { getProfile, updateProfile } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js'
const router = express.Router();

router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);

export default router;