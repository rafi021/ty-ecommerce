import { Request, Response } from 'express';
import { AddressSchema, UpdateUserRoleSchema, UpdateUserSchema} from '../schema/users';
import { prismaclient } from '../config/prisma';
import { Address, User } from '@prisma/client';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { BadRequestException } from '../exceptions/bad-requests';

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

export const updateUser = async(req:any,res:Response) => {
    const validatedData = UpdateUserSchema.parse(req.body);
    let shippingAddress:Address;
    let billingAddress:Address;

    if(validatedData.defaultShippingAddress){
        try {
            shippingAddress = await prismaclient.address.findFirstOrThrow({
                where:{
                    id: validatedData.defaultShippingAddress
                }
            })
        } catch (error) {
            throw new NotFoundException("Address not found", ErrorCode.NOT_FOUND);
        }

        
        if(shippingAddress.userId !== req.user.id){
            throw new BadRequestException("Address does not belog to user", ErrorCode.INTERNAL_EXCEPTION);
        }
    }
    if(validatedData.defaultBillingAddress){
        try {
            billingAddress = await prismaclient.address.findFirstOrThrow({
                where:{
                    id: validatedData.defaultBillingAddress
                }
            })
        } catch (error) {
            throw new NotFoundException("Address not found", ErrorCode.NOT_FOUND);
        }
        if(billingAddress.userId !== req.user.id){
            throw new BadRequestException("Address does not belog to user", ErrorCode.INTERNAL_EXCEPTION);
        }
    }

    const updatedUser = await prismaclient.user.update({
        where: {
            id: req.user.id
        },
        data: {
           name: validatedData.name,
            defaultShippingAddressId: validatedData.defaultShippingAddress,
            defaultBillingAddressId: validatedData.defaultBillingAddress
        }
    })
    res.status(200).json(updatedUser);
}

export const listUsers = async (req:any,res:Response) => {
    const users = await prismaclient.user.findMany({
        skip: +req.query.skip || 0,
        take: 5,
    })
    res.status(200).json(users);
}
export const getUserById = async (req:Request,res:Response) => {
    try {
        const user = await prismaclient.user.findFirstOrThrow({
            where: {
                id: +req.params.id
            },
            // include: {
            //     addresses: true
            // }
        })
    } catch (error) {
        throw new NotFoundException("User not found", ErrorCode.NOT_FOUND);
    }
}
export const changeUserRole = async (req:Request,res:Response) => {
    // Validation
    UpdateUserRoleSchema.parse(req.body);
    try {
        const user = await prismaclient.user.update({
            where: {
                id: +req.params.id
            },
            data: {
                role: req.body.role
            }
        })
    } catch (error) {
        throw new NotFoundException("User not found", ErrorCode.NOT_FOUND);
    }
}