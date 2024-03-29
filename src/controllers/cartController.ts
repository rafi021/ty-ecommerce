import { Request, Response } from "express";
import { CartCreateSchema, ChanageQuantitySchema } from "../schema/cart";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { prismaclient } from "../config/prisma";
import { Product } from "@prisma/client";
import { BadRequestException } from "../exceptions/bad-requests";

export const addItemToCart = async (req: any, res: Response) => {
    const validatedData = CartCreateSchema.parse(req.body);
    let product: Product;

    try {
        product = await prismaclient.product.findFirstOrThrow({
            where: {
                id: validatedData.productId
            }
        })
    } catch (error) {
        throw new NotFoundException("Prduct not found", ErrorCode.NOT_FOUND)
    }

    // Check for the existance of the same product in this user's cart and alter the quantity as required
    const checkCartProduct = await prismaclient.cartItem.findFirst({
        where: {
            userId: req.user.id,
            productId: product.id
        }
    })

    if(checkCartProduct){
        const updatedProduct = await prismaclient.cartItem.update({
            where: {
                id: checkCartProduct.id
            },
            data: {
                quantity: checkCartProduct.quantity+validatedData.quantity
            }
        })
        res.status(200).json(updatedProduct)
    }else{
        const newProduct = await prismaclient.cartItem.create({
            data: {
                userId: req.user.id,
                productId: product.id,
                quantity: validatedData.quantity
            }
        })
        res.status(201).json(newProduct)
    }
}

export const deleteItemFromCart = async (req: any, res: Response) => {

    // Check if user deleting its own cart item
    const cartItem = await prismaclient.cartItem.findFirstOrThrow({
        where: {
            id: +req.params.id,
        }
    })
    if (req.user.id !== cartItem.userId) {
        throw new BadRequestException("You cannot delete other cart item", ErrorCode.UNAUTHORIZED)
    }

    const cart = await prismaclient.cartItem.delete({
        where: {
            id: +req.params.id
        }
    });
    res.status(200).json(cartItem);
}

export const changeQuantity = async (req: any, res: Response) => {
    const validatedData = ChanageQuantitySchema.parse(req.body);
    
    // Check if user checking he's own cart item
    const cartItem = await prismaclient.cartItem.findFirstOrThrow({
        where: {
            id: +req.params.id,
        }
    })

    if (req.user.id !== cartItem.userId) {
        throw new BadRequestException("You cannot delete other cart item", ErrorCode.UNAUTHORIZED)
    }

    const updatedCart = await prismaclient.cartItem.update({
        where: {
            id: +req.params.id
        },
        data: {
            quantity: validatedData.quantity
        }
    })
    res.status(200).json(updatedCart);
}

export const getCart = async (req: any, res: Response) => {
    const carts = await prismaclient.cartItem.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            product: true
        }
    });
    res.status(200).json(carts);
}
