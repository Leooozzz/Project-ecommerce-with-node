import { RequestHandler } from "express";
import { registerSchema } from "../schemas/user-register-schema";
import { createUser, logUser } from "../services/user";
import { loginSchema } from "../schemas/login-schema";
import { error } from "console";

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
