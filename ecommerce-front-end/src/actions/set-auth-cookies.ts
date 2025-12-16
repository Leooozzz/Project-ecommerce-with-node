"use server"

import { setServerAuthToken } from "@/lib/server-cookies"

export const setAuthCookies=async(token:string)=>{
    await setServerAuthToken (token)
}