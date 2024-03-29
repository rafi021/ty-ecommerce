import { Request, Response } from "express";
import { prismaclient } from "../config/prisma";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createOrder = async(req:any,res:Response) => {
    // 1. to create a transaction
    // 2. to list all the cart items and process them if cart is not empty
    // 3. calculate the total amount
    // 4. fetch address of user
    // 5. to define computed field for formated address on address model
    // 6. we will create a order and order products
    // 7. create order event
    // 8. empty the cart items

    return await prismaclient.$transaction(async(tx) => {
        const cartItems = await tx.cartItem.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                product: true
            }
        })
        if(cartItems.length == 0) {
            return res.status(200).json({message: "cart is empty"});
        }

        const price = cartItems.reduce((prev, current) =>{
            return prev + (current.quantity * +current.product.price)
        }, 0);

        const address = await tx.address.findFirst({
            where: {
                id: req.user.defautShippingAddressId
            }
        })

        const order = await tx.order.create({
            data: {
                userId: req.user.id,
                netAmount: price,
                address: address?.formattedAddress ?? "",
                orderProducts: {
                    create: cartItems.map((cart) => {
                        return {
                            productId: cart.productId,
                            quantity: cart.quantity
                        }
                    })
                }
            }
        })

        const orderEvent = await tx.orderEvent.create({
            data: {
                orderId: order.id,
            }
        })

        await tx.cartItem.deleteMany({
            where: {
                userId: req.user.id
            }
        })
        return res.json(order)
    })
}
export const listOrder = async(req:any,res:Response) => {
    const orders = await prismaclient.order.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })
    res.json(orders);
}
export const cancelOrder = async(req:any,res:Response) => {

    // 1. wrap the whole code in transaction
    // 2. check if the login user is unable to cancel other users order

    return await prismaclient.$transaction(async(tx) => {
        const order = await tx.order.findFirst({
            where: {
                id: req.params.orderId
            },
            include: {
                orderProducts: {
                    include: {
                        product: true
                    }
                }
            }
        })
        if(!order) {
            throw new NotFoundException("Order not found", ErrorCode.NOT_FOUND);
        }
        if(order.userId !== req.user.id) {
            throw new NotFoundException("You cannot cancel others order", ErrorCode.UNPROCESSABL_ENTITY);
        }

        await prismaclient.order.update({
            where: {
                id: +req.params.id
            },
            data: {
                status: "CANCELLED"
            }
        })

        await prismaclient.orderEvent.create({
            data: {
                orderId: +req.params.id,
                status: "CANCELLED"
            }
        })

        res.json(order);
    })
}
export const getOrderById = async(req:Request,res:Response) => {
    try {
        const order = await prismaclient.order.findFirst({
            where: {
                id: +req.params.id
            },
            include: {
                orderProducts: {
                    include: {
                        product: true,
                    }
                },
                events: true
            }
        })

        res.json(order);
    } catch (error) {
        throw new NotFoundException("Order not found", ErrorCode.NOT_FOUND)
    }
}