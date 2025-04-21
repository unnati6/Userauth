import express from 'express';
import {
  addBio,
  getBio
 
} from '../Controllers/BioController.js';
import { Userverify } from '../Middlewares/Userverify.js';

const bioRouter = express.Router();

bioRouter.post('/add', Userverify, addBio);
bioRouter.get('/getbio',Userverify,getBio)
export default bioRouter;
