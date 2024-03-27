import { NextFunction, Request, Response } from "express";
import { prismaclient } from "../config/prisma";
import { hashSync,compareSync } from 'bcrypt';
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { signUpSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";

export const signUp = async(req:Request,res:Response, next:NextFunction) => {

        // validation check
        signUpSchema.parse(req.body);
        const { name,email,password } = req.body;

        // check if user already exists
        let user = await prismaclient.user.findFirst({where: {email}});
        if(user){
            throw new BadRequestException("User Already Exists", ErrorCode.USER_ALREADY_EXISTS);
        }

        // then create new user
        user = await prismaclient.user.create({
            data:{
                name,
                email,
                password: hashSync(password, 10)
            }
        })

        res.status(201).json({
            message: "User Created Successfully",
            user
        });
}

export const login = async(req:Request,res:Response) => {
    const { email,password } = req.body;

    let user = await prismaclient.user.findFirst({where: {email}});
    if(!user){
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }
    if(!compareSync(password, user.password)){
        throw new BadRequestException("Password is incorrect", ErrorCode.INVALID_CREDENTIALS);
    }

    const token = jwt.sign({
        userId: user.id,
    }, JWT_SECRET as string, {
        expiresIn: '3d'
    });

    res.status(200).json({
        message: "User Logged In Successfully",
        token
    })
}

// me -> return the logged in user
export const getUser = async(req:any, res:Response) => {

    res.status(200).json({
        message: "Logined In User Information",
        user: req.user
    })
}