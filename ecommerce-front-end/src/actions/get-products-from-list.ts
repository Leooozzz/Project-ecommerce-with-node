"use server"

import { data } from "@/data"
import { api } from "@/lib/axios"
import { Product } from "@/types/Product"


export const getProductsFromList =async(ids:(string | number)[])=>{
   
    try{
        const response= await api.post('/cart/mount',{ids})
        if(response.status===200){
            return response.data.products as Product[]
        }
    }catch{

    }
    return []
}