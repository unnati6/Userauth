import express from 'express';
import { adddata, checkdata, updateProfile } from '../Controllers/UserController.js';
import { loginvalidation, singupvalidation } from '../Middlewares/UserValidation.js';
import { Userverify } from '../Middlewares/Userverify.js';
const router = express.Router();

router.post('/signup',singupvalidation,adddata);
router.post('/login',loginvalidation,checkdata);
router.put('/profile', Userverify, updateProfile);
export default router;