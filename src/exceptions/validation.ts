import { error } from 'console';
import { HttpException } from "./root";

export class UnProccessableEntity extends HttpException{
    constructor(error: any, message:string, errorCode:number){
        super(message, errorCode, 422, error);
    }
}