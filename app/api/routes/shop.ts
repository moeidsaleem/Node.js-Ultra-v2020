import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
const route = Router();

export default (app: Router) => {
  app.use('/shops', route);


  //get All
  route.get('/all', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {

    return res.json({ user: req.currentUser }).status(200);
  });

  //get Single 
  route.get('/:id',middlewares.isAuth, middlewares.attachCurrentUser,(req: Request, res: Response)=>{

  })
  
};
