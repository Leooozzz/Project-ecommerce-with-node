"use server"

import { clearServerCart } from "@/lib/server-cookies"


export const clearCartCookie=async()=>{
    await clearServerCart()
}