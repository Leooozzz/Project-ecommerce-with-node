import { RequestHandler } from "express";
import { registerSchema } from "../schemas/user-register-schema";
import { createUser } from "../services/user";

export const register:RequestHandler=async(req,res)=>{
    const result = registerSchema.safeParse(req.body)
    if(!result.success){
       return res.status(400).json({error:"dados invalidos"})
    }
    const { name,email,password }=result.data

    const user=await createUser(name,email,password)
    if(!user){
        return  res.status(400).json({error:"E-mail ja cadastrado"})
    }
    res.status(201).json({error:null,user})
}