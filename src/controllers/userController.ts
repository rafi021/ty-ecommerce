import { Request, Response } from 'express';
import { AddressSchema } from '../schema/users';
import { prismaclient } from '../config/prisma';
import { User } from '@prisma/client';

export const addAddress = async(req:any, res:Response) => {
    AddressSchema.parse(req.body);
    const address = await prismaclient.address.create({
        data: {
           ...req.body,
            userId: req.user.id
        }
    })
    res.status(201).json(address)
}

export const updateAddress = async(req:any,res:Response) => {
    AddressSchema.parse(req.body);
    const address = await prismaclient.address.update({
        where: {
            id: +req.params.id
        },
        data: {
           ...req.body,
            userId: req.user.id
        }
    })
    res.status(201).json(address)
}

export const deleteAddress = async(req:Request,res:Response) => {
    const address = await prismaclient.address.delete({
        where: {
            id: +req.params.id
        }
    })
    res.status(200).json(address)
}

export const getAddress = async(req:Request,res:Response) => {
    const address = await prismaclient.address.findFirstOrThrow({
        where: {
            id: +req.params.id
        }
    })
    res.status(200).json(address)
}

export const listAddress = async(req:any,res:Response) => {
    const addresses = await prismaclient.address.findMany({
        skip: +req.query.skip || 0,
        take: 5,
    });
    res.status(200).json(addresses); 
}