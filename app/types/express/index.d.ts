import { Document, Model } from 'mongoose';
import mongoose from 'mongoose'
import { IUser } from '../../interfaces/IUser';
import { IShop } from '../../interfaces/IShop';

declare global {

  namespace Express {
    export interface Request {
      currentUser: IUser & Document;

    }    
  }
  namespace Models {
    export type ShopModel = Model<IShop & Document>;
    export type UserModel = Model<IUser & Document>;
  }
  export type ObjectId = mongoose.Schema.Types.ObjectId;
  

}

