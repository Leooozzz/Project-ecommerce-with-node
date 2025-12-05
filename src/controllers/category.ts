import { RequestHandler } from "express";
import { getCategoryBySlug, getCategoryMetadata } from "../services/category";

export const getCategoryWithMetadata:RequestHandler=async(req,res)=>{
    const {slug}=req.params
    const category= await getCategoryBySlug(slug)
    if(!category){
        return res.json({erro:"Categoria não encontrada"})
    }


    const metadata= await getCategoryMetadata(category.id)
    res.json({error:null,category,metadata})
}