import express from 'express';
import { adddata, checkdata, updateProfile,getProfile} from '../Controllers/UserController.js';
import { loginvalidation, singupvalidation } from '../Middlewares/UserValidation.js';
import { Userverify } from '../Middlewares/Userverify.js';
import upload from '../Middlewares/Multer.js';
const router = express.Router();

router.post('/signup',singupvalidation,adddata);
router.post('/login',loginvalidation,checkdata);
router.put('/profile', upload.single('picture'),Userverify, updateProfile);
router.get('/getdata',Userverify,getProfile);
export default router;