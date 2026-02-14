import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: email,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:['student','admin','senior'],
        default:'student'
    },
    createAt:{
        type: Date,
        default: Date.now()
    }
    
})

export const User = mongoose.model("User", userSchema);
