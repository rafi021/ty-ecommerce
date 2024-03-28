import { Request, Response } from "express";
import { prismaclient } from "../config/prisma";

export const getAllProducts = async (req:Request, res:Response) => {
    
}

export const getProduct = async (req:Request, res:Response) => {

}

export const createProduct = async (req:Request, res:Response) => {
    
    const product = await prismaclient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(','),
        }
    })
    res.status(201).json(product)
}

