import express from 'express';
import {
  addLink,
  getUserLinks,
  updateLink,
  deleteLink,
  reorderLinks
} from '../Controllers/LinkController.js';
import { Userverify } from '../Middlewares/Userverify.js';

const linkRouter = express.Router();

linkRouter.post('/add', Userverify, addLink);
linkRouter.get('/', Userverify, getUserLinks);
linkRouter.put('/update/:id', Userverify, updateLink);
linkRouter.delete('/delete/:id', Userverify, deleteLink);
linkRouter.put('/reorder', Userverify, reorderLinks);  // expects an array of IDs in order

export default linkRouter;
