"use server"

import { api } from "@/lib/axios"
import { Category } from "@/types/category"
import { ProductComplete } from "@/types/Product"


export const getProductWithCategory=async(id:number)=>{
    try{    
        const response= await api.get(`/product/${id}`)
        if(response.status === 200){
            return{
                product:response.data.product as ProductComplete,
                category:response.data.category as Category
            }
        }
    }catch{

    }
    return null
}