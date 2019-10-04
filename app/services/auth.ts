import { Service, Inject } from 'typedi';




@Service()
export default class AuthService{
    constructor(
        @Inject('userModel') private userModel : Models.UserModel,
        @Inject('logger') private logger,

    ){}


}