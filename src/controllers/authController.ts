import { Request, Response } from "express";


export const login = (req:Request,res:Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({
        message: 'Hello World!'
    }));
}
