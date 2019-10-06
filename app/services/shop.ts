import Container, { Service, Inject } from 'typedi';
import config from '../config';
import { IShop, IShopInput } from '../interfaces/IShop';
import mongoose from 'mongoose'
@Service()
export default class ShopService {

  constructor(
    @Inject('shopModel') private shopModel: Models.ShopModel,
    @Inject('logger') private logger,
  ) { }
  public async getShops(): Promise<{ shops: Array<IShop>; }> {
    try {
      const shopRecord = await this.shopModel.find();
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
        photo: shopInputDTO.photo
      })
      console.log('ham cvhalein')
      if (!shopRecord) {
        throw new Error('Shop cannot be created');
      }
      const shop = shopRecord;
      const success = true;
      console.log('shop', shop)
      return { shop, success };
    } catch (e) {
      console.log("ERRRRRRORRR_____RRRRR__RRRR", e)
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

  



  // public async SignIn(email: string, password: string): Promise<{ user: IUser; token: string }> {
  //   const shopRecord = await this.userModel.findOne({ email });
  //   if (!shopRecord) {
  //     throw new Error('User not registered');
  //   }
  //   const validPassword = await argon2.verify(shopRecord.password, password);
  //   if (validPassword) {
  //     this.logger.silly('Generating JWT');
  //     const token = this.generateToken(shopRecord);
  //     const user = shopRecord.toObject();
  //     Reflect.deleteProperty(user, 'password');
  //     Reflect.deleteProperty(user, 'salt');
  //     return { user, token };
  //   } else {
  //     throw new Error('Invalid Password');
  //   }
  // }

  // private generateToken(user) {
  //   const today = new Date();
  //   const exp = new Date(today);
  //   exp.setDate(today.getDate() + 60);
  //    this.logger.silly(`Sign JWT for userId: ${user._id}`);
  //   return jwt.sign(
  //     {
  //       _id: user._id, 
  //       role: user.role,
  //       name: user.name,
  //       exp: exp.getTime() / 1000,
  //     },
  //     config.jwtSecret,
  //   );
  // }
}