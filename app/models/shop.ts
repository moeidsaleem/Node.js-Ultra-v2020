import {IShop } from '../interfaces/IShop';
import mongoose from 'mongoose';

const Shop = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, 'Please provide complete title'],
            index: true
        },
        photo:{
            type: String,
            lowecase: true,
            required:false
        },
        location: {
            type: { type: String },
            coordinates: []
          },
          likes:{
              type:Array
          }

},{
    timestamp: true
})
Shop.index({ "location": "2dsphere" });

export default mongoose.model<IShop & mongoose.Document>('Shop', Shop)