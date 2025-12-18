"use server"

import { api } from "@/lib/axios"
import { Product } from "@/types/Product"


export const getRelatedProducts=async (id:number)=>{
    try{
   const response= await api.get(`/products/${id}/related`,{params:{
    limit:4
   }})
   if(response.status===200){
    return response.data.products as Product[]
   }
    }catch{

    }
    return []
}