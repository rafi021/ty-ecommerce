import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import { JWT_SECRET } from "../secrets";
import * as jwt from "jsonwebtoken";
import { prismaclient } from "../config/prisma";

const authMiddleware = async(req:any, res:Response, next:NextFunction) =>{
    
    // 1. extract the token from the header
    // req?.headers?.authorization?.startsWith('Bearer')
    const token = req.headers.authorization.split(' ')[1];

    // 2. if the token is not present, throw an error of unauthorized
    if(!token) throw new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED);

    try {
        // 3. if the token is present, verify that token is valid and extract the payload
        const payload = jwt.verify(token, JWT_SECRET) as any;
        
        // 4. to get the user from the payload
        const user = await prismaclient.user.findFirst({where: {id: payload.userId}})
        if(user){
            req.user = user;
        }else{
            throw new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED);
        }
        // 5. to attach the user to the current request object
       
        next();

    } catch (error) {
        next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    }
    

}
export default authMiddleware;