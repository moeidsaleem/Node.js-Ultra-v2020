import expressLoader from './express';
import mongooseLoader from './mongoose';
import Logger from './logger';
import injector from './injector'

export default async ({ expressApp }) => {

    const mongoConnection = await mongooseLoader()
    const userModel = {
      name: 'userModel',
      model: require('../models/user').default,
    };
    const shopModel ={
      name:'shopModel',
      model: require('../models/shop').default,
    }
  const { agenda } = await injector({
    mongoConnection,
    models: [
      userModel,
      shopModel
    ]
  });

    await expressLoader({ app: expressApp });
    Logger.info('Express ready to go!!');
  };