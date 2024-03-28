import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";

const adminMiddleware = async(req:any, res:Response, next:NextFunction) =>{
    const user = req.user;
    if(user.role!== 'admin') {
        next()
    }else{
        next(new UnauthorizedException("Unauthorized access", ErrorCode.UNAUTHORIZED));
    }
}
export default adminMiddleware;