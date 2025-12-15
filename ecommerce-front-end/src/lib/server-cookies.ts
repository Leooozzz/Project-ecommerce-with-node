import { cartItem } from "@/types/cart-item";
import { cookies } from "next/headers";

export const getServerCart = async ():Promise <cartItem[]> => {
    const cookieStore = await cookies();
    const value =cookieStore.get('cart')?.value
    if(!value) return []
    try{
        return JSON.parse(value)
    }catch{
        return []
    }

};

export const setServerCart = async (cart:cartItem) =>{
    const cookieStore = await cookies();
    cookieStore.set('cart',JSON.stringify(cart),{httpOnly:true})
}


export const clearServerCart=async () =>{
    const cookieStore = await cookies()
    cookieStore.delete('cart')
}