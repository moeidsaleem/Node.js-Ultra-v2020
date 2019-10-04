import { Service, Inject, Token } from 'typedi';
import jwt from 'jsonwebtoken'
import config from '../config';
import { randomBytes } from 'crypto';
import {IUser } from '../interfaces/IUser';

import argon2 from 'argon2';



@Service()
export default class AuthService{
    constructor(
        @Inject('userModel') private userModel : Models.UserModel,
        @Inject('logger') private logger,

    ){}


    public async SignUp(userInputDTO: IUser): Promise<{ user: IUser; token: string }> {

        try{
            const salt = randomBytes(32);
            this.logger.silly('Hashing password');
           const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
            this.logger.silly('Creating user db record');
            const userRecord = await this.userModel.create({
              ...userInputDTO,
              salt: salt.toString('hex'),
              password: hashedPassword,
            });
            this.logger.silly('Generating JWT');
           const token = this.generateToken(userRecord);
           const user = userRecord.toObject();

        return { user, token }
        }catch (e) {
            this.logger.error(e);
            throw e;
          }

    }


    private generateToken(user) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);
    
        this.logger.silly(`Sign JWT for userId: ${user._id}`);
        return jwt.sign(
          {
            _id: user._id, // We are gonna use this in the middleware 'isAuth'
            role: user.role,
            name: user.name,
            exp: exp.getTime() / 1000,
          },
          config.jwtSecret,
        );
      }

}