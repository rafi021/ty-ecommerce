import { Request, Response } from "express";
import { prismaclient } from "../config/prisma";
import { hashSync } from 'bcrypt';

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
