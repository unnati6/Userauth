import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './Routes/UserRouter.js';
import linkRouter from './Routes/LinkRouter.js';
const PORT = process.env.PORT || 5000;
const app = express();
const db  = "mongodb+srv://unnati:unnati12345@cluster0.m35bgfm.mongodb.net/userinfo?retryWrites=true&w=majority&appName=Cluster0";
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
app.listen(PORT,()=>{
    console.log(`${PORT} is connect`)
})
mongoose.connect(db)
.then(()=>{
    console.log("Database Connect")
})
.catch(()=>{
    console.log("Database not connect")
})
app.use('/auth',router);
app.use('/links',linkRouter)