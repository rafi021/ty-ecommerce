import { Request, Response } from "express";
import { prismaclient } from "../config/prisma";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const getAllProducts = async (req:any, res:Response) => {
    const count = await prismaclient.product.count();
    const products = await prismaclient.product.findMany({
        skip: +req.query.skip || 0,
        take: 5
    });
    res.status(200).json({
        count,
        data: products
    });
}

export const getProduct = async (req:Request, res:Response) => {
    const product = await prismaclient.product.findFirstOrThrow({
        where: {
            id: +req.params.id
        }
    });
    res.json(product);
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

export const updateProduct = async (req:Request, res:Response) => {
    try{
        const product = req.body;
        if(product.tags){
            product.tags = product.tags.join(',')
        }
        const updatedProduct = await prismaclient.product.update({
            where: {
                id: +req.params.id
            },
            data: product
        })
        res.status(200).json(updatedProduct);
    }catch(err){
        throw new NotFoundException("Product not found", ErrorCode.NOT_FOUND)
    }
}

export const deleteProduct = async (req:Request, res:Response) => {
    const deletedProduct = await prismaclient.product.delete({
        where: {
            id: +req.params.id
        }
    });
    res.status(200).json(deletedProduct);
}

