import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IShop, IShopInput } from '../interfaces/IShop';

@Service()
export default class AuthService {
  constructor(
      @Inject('shopModel') private shopModel : Models.UserModel,
      @Inject('logger') private logger,
  ) {}
  public async getShops(): Promise<{ shops: Array<IShop>; }> {
    try {
      const shopRecord = await this.shopModel.find();
      if (!shopRecord) {
        throw new Error('No Shops found!');
      }
       this.logger.silly('Sending welcome email');
      const shops = shopRecord.tObject();
      return { shops };
    } catch (e) {
       this.logger.error(e);
      throw e;
    }
  }


  public async addShop(shopInputDTO: IShopInput): Promise<{ shops: IShop }> {
    try {
      const shopRecord = await this.shopModel.create({
        title:shopInputDTO.title,
        photo:shopInputDTO.photo
      })
      if (!shopRecord) {
        throw new Error('Shop cannot be created');
      }
      const shops = shopRecord.tObject();
      return { shops };
    } catch (e) {
       this.logger.error(e);
      throw e;
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