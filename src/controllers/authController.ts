import { Request, Response } from "express";
import { prismaclient } from "../config/prisma";
import { hashSync,compareSync } from 'bcrypt';
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

export const signUp = async(req:Request,res:Response) => {
    const { name,email,password } = req.body;

    let user = await prismaclient.user.findFirst({where: {email}});
    if(user){
        throw new Error("User Already Exists");
    }
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
    })
}

export const login = async(req:Request,res:Response) => {
    const { email,password } = req.body;

    let user = await prismaclient.user.findFirst({where: {email}});
    if(!user){
        throw new Error("User doesn't Exists");
    }
    if(!compareSync(password, user.password)){
        throw new Error("Incorrect password");
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
