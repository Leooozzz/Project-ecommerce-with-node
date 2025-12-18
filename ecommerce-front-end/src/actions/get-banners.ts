"use server"
import { api } from "@/lib/axios"
import { Banner } from "@/types/banner"

export const getBanner=async()=>{
    try{
        const response = await api.get('/banners')
        if(response.status===200){
            return response.data.banners as Banner[]
        }
        
    }catch{}
    return []
}