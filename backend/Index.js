import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bioRouter from './Routes/BioRouter.js'
import router from './Routes/UserRouter.js';
import linkRouter from './Routes/LinkRouter.js';
const PORT = process.env.PORT || 5000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db  = "mongodb+srv://unnati:unnati12345@cluster0.m35bgfm.mongodb.net/userinfo?retryWrites=true&w=majority&appName=Cluster0";
dotenv.config();
app.use(bodyParser.json());
const corsOptions = {
    origin: ['https://userauth-7gpr.vercel.app'], // yaha apne frontend ka URL daalo
    credentials: true,
  };
app.use(cors(corsOptions));
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
// ⬇️ Serve the 'uploads' folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json());
app.use('/auth',router);
app.use('/links',linkRouter)
app.use('/bio',bioRouter)