import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

        fname: 
        { 
            type: String,
             trim: true 
            },
        lname: 
        { 
            type: String,
             trim: true 
            },
    
    picture: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
