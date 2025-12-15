"use server"

import { getServerCart } from "@/lib/server-cookies"

export const getCartState = async () =>{
    const cart = await getServerCart();
    return{cart}
}