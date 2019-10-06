import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import shopService from '../../services/shop';
import { Container } from 'typedi';
import { IShopInput } from '../../interfaces/IShop';

const route = Router();

export default (app: Router) => {
  app.use('/shops', route);
  const shopServiceInstance = Container.get(shopService);

  //get All
  route.get('/all', middlewares.isAuth, middlewares.attachCurrentUser,async (req: Request, res: Response) => {

    try{
        const {shops} = await shopServiceInstance.getShops(req.currentUser.location);
        return res.json({ shops }).status(200);

    }catch(e){

    }
  });

  //get Single 
  route.get('/:id',middlewares.isAuth, middlewares.attachCurrentUser,(req: Request, res: Response)=>{

  })


  //create Shop
  route.post('/add', 
    celebrate({
        body:Joi.object({
            title: Joi.string().required(),
            photo: Joi.string().required(),
            location:Joi.object()
        })
    }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    console.log(req.body);
        // logger.debug('req', req.body);
        try{
            const { shop, success } = await shopServiceInstance.addShop(req.body as IShopInput);
            return res.status(201).json({shop, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  

    //create Shop
  route.get('/delete/:id', middlewares.isAuth, middlewares.attachCurrentUser, async(req:Request, res:Response, next: NextFunction)=>{
  console.log(req.body);
      try{
          const {  success } = await shopServiceInstance.deleteShop(req.params.id as string);
          return res.status(201).json({ success});
      }catch(e){
          console.log(e);
          return next(e)
      }
  })

//like Shop
route.get('/like/:id',  middlewares.isAuth, middlewares.attachCurrentUser,async(req:Request, res:Response, next: NextFunction)=>{
    console.log(req.body);
        try{
            const {  success } = await shopServiceInstance.likeShop(req.currentUser._id,req.params.id as string);
            return res.status(201).json({ success});
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  
  
  
  
    


  
};
