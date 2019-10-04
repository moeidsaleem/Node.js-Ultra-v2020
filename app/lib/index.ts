import expressLoader from './express';
import mongooseLoader from './mongoose';
import Logger from './logger';

export default async ({ expressApp }) => {

    const mongoConnection = await mongooseLoader()
    Logger.info("Mongodb lock and loaded!!")

    const userModel = {
      name: 'userModel',
      model: require('../models/user').default,
    };
 
    await expressLoader({ app: expressApp });
    Logger.info('Express ready to go!!');
  };