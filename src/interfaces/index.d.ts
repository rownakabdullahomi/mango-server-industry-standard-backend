import { IUser } from '../modules/user/user.interface';

declare global {
import { Request } from 'express';
    namespace Express{
        interface Request{
            user: IUser;
        }
    }
}