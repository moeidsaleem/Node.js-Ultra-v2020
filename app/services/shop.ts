import Container, { Service, Inject } from 'typedi';
import config from '../config';
import { IShop, IShopInput } from '../interfaces/IShop';
import mongoose from 'mongoose'
@Service()
export default class ShopService {

  constructor(
    @Inject('shopModel') private shopModel: Models.ShopModel,
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('logger') private logger,
  ) { }
  public async getShops(userLoc?): Promise<{ shops: Array<IShop>; }> {
    try {

      let coordinates =[userLoc.lat || -73.97, userLoc.long || 40.77];

      const shopRecord = await this.shopModel.aggregate([
        { "$geoNear": {
            "near": {
                "type": "Point",
                "coordinates": coordinates
            },
            "distanceField": "distance",
            "spherical": true,
            "maxDistance": 10000
        }}
    ]);



   
      if (!shopRecord) {
        throw new Error('No Shops found!');
      }
      this.logger.silly('Sending welcome email');
      const shops = shopRecord;
      return { shops };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async addShop(shopInputDTO: IShopInput): Promise<{ shop: IShop; success: boolean }> {
    try {
   
    
      const shopRecord = await this.shopModel.create({
        title: shopInputDTO.title,
        photo: shopInputDTO.photo,
        location:shopInputDTO.location,
        likes:[]
      })
      if (!shopRecord) {
        throw new Error('Shop cannot be created');
      }
      const shop = shopRecord;
      const success = true;
      console.log('shop', shop)
      return { shop, success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteShop(shopId: ObjectId): Promise<{  success: boolean; }> {
    try {
      
      const shopRecord = this.shopModel.findOneAndRemove({ "_id": shopId });
     console.log('shop----record---s', shopRecord)
      return { success: true}

    } catch (e) {
      console.log('error', e)

    }
  }

  public async likeShop(userId,shopId: string): Promise<{  success: boolean; }> {
    try {



this.shopModel.findOneAndUpdate({_id: shopId}

, {$push: {likes:  userId}}

, function (err, doc) {

    if (err) {

        console.log("update document error");

    } else {

        console.log("update document success");

        console.log('docs',doc);

    }

});

      return { success: true}

    } catch (e) {
      console.log('error', e)

    }
  }

  


}