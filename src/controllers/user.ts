import { RequestHandler } from "express";
import { registerSchema } from "../schemas/user-register-schema";
import { createAddRess, createUser, getAddressesFromUserId, logUser } from "../services/user";
import { loginSchema } from "../schemas/login-schema";
import { error } from "console";
import { addAddressSchema } from "../schemas/add-address-schema";

export const register: RequestHandler = async (req, res) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "dados invalidos" });
  }
  const { name, email, password } = result.data;

  const user = await createUser(name, email, password);
  if (!user) {
    return res.status(400).json({ error: "E-mail ja cadastrado" });
  }
  res.status(201).json({ error: null, user });
};

export const login: RequestHandler = async (req, res) => {
    const result =loginSchema.safeParse(req.body)
    if(!result.success){
        return res.status(400).json({error:"dados invalidos"})
    }
    const {email,password}=result.data
    const token= await logUser(email,password)
    if(!token){
        res.status(401).json({error:'Acesso negado'})
    }
    res.json({error:null,token})
};


export const addRess:RequestHandler=async(req,res)=>{
  const userId=(req as any).userId
  if(!userId){
    return res.status(401).json({error:"acesso negado"})
  }
  const result = addAddressSchema.safeParse(req.body)
    if(!result.success){
      return res.status(400).json({error:"Dados invalidos"})
    }
    const address = await createAddRess(userId, result.data)

    if(!address){
      return res.status(400).json({error:"Aconteceu algum erro"})
    }
  res.status(201).json({error:null,address})
}



export const getAddresses:RequestHandler=async(req,res)=>{
  const userId = (req as any).userId
  if(!userId){
    return res.json(401).json({error:"Acesso negado"})
  }
  const addresses=await getAddressesFromUserId(userId)
  res.json({error:null,addresses})
}