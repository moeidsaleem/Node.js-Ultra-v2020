import {IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'Please provide full name'],
            index: true
        },
        email:{
            type: String,
            unique: true,
            index: true,
            lowecase: true
        },
        password:{
            type: String
        },
        role:{
            type: String,
            default: 'user'
        }

},{
    timestamp: true
})

export default mongoose.model<IUser & mongoose.Document>('User', User)