import expressLoader from './express';
import mongooseLoader from './mongoose';
import Logger from './logger';
import injector from './injector'

export default async ({ expressApp }) => {

    const mongoConnection = await mongooseLoader()
    Logger.info("Mongodb lock and loaded!!")

    const userModel = {
      name: 'userModel',
      model: require('../models/user').default,
    };

  //   //using agenda 
  // const { agenda } = await injector({
  //   mongoConnection,
  //   models: [
  //     userModel
  //   ]
  // });
 
    await expressLoader({ app: expressApp });
    Logger.info('Express ready to go!!');
  };