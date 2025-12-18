"use server"
import { api } from "@/lib/axios"
import { Product } from "@/types/Product"

type ProductFilters={
    metadata?:object,
    orderBy:'views'|'seeling'|'price',
    limit:number
}

export const getProducts=async({metadata,orderBy,limit}:ProductFilters)=>{
    try{
        let params:any= {}
        if(metadata) params.metadata=JSON.stringify (metadata)
        if(orderBy)params.orderBy=orderBy
        if(limit)params.limit=limit;
        const response=await api.get('/products',{params})
        if(response.status === 200) return response.data.products as Product[]
    }catch{

    }
    return []
}