import { NextFunction, Request, Response } from "express";
import { getUserBytoken } from "../services/user";

export const authMiddleware=async (req:Request,res:Response,next:NextFunction)=>{
    const authHeader=req.headers['authorization']
    if(!authHeader){
        return res.status(401).json({error:"Acesso negado"})
    }
    const tokenSplit=authHeader.split("Bearer ");
    if(!tokenSplit[1]){
         return res.status(401).json({error:"Acesso negado"})
    }
    const token=tokenSplit[1]
    const userId=await getUserBytoken(token)
    if(!userId){
        return res.status(401).json({error:"Acesso negado"})
    }
   (req as any).userId=userId
   next()
}