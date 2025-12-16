"use server"
import { cartItem } from "@/types/cart-item";
import { setServerCart } from "@/lib/server-cookies";

export const setCartState = async (cart:cartItem [])=>{
    await setServerCart(cart)
}