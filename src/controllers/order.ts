import { RequestHandler } from "express";
import { getOrderById, getUserOrders } from "../services/order";
import { getOrderSchema } from "../schemas/get-order-schema";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image-url";

export const listOrders:RequestHandler= async (req, res)=>{
    const {userId}=(req as any).userId
    if(!userId){
        return res.status(401).json({error:"Acesso negado"})
    }
    const orders = await getUserOrders(userId)


    res.json({error:null,orders})
}


export const getOrder : RequestHandler=async (req,res)=>{
    const userId = (req as any).userId
    if(!userId){
        return res.status(401).json({error:"Acesso negado"})
    }

    const result=getOrderSchema.safeParse(req.params)
    if(!result.success){
     return res.status(400).json({error:"Id invalido"})
    }
    const   {id} = result.data;
    const order=await getOrderById(parseInt(id),userId)

    if(!order){
       return res.status(404).json({error:"pedido nao encontrado"})
    }
    const itemsWithAbsoluteUrl=order.orderItems.map(item=>({
        ...item,
        product:{
            ...item.product,
            image:item.product.image ? getAbsoluteImageUrl(item.product.image) : null
        }
    }))
    res.json({error:null, order:{
        ...order,
        orderItems:itemsWithAbsoluteUrl
    }})
}