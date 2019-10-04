import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import shop from './routes/shop';


// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	user(app);
	shop(app);
	return app
}