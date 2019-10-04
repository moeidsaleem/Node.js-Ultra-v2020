import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import events from './events';
import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';

@EventSubscriber()
export default class UserSubscriber {
  @On(events.user.signIn)
  public onUserSignIn({ _id }: Partial<IUser>) {
    const Logger = Container.get('logger');
    try {
      const UserModel = Container.get('UserModel') as mongoose.Model<IUser & mongoose.Document>;
      UserModel.update({ _id }, { $set: { lastLogin: new Date() } });
    } catch (e) {
      throw e;
    }
  }
  @On(events.user.signUp)
  public onUserSignUp({ name, email, _id }: Partial<IUser>) {
    const Logger = Container.get('logger');
  }
}
