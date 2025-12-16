"use client"

import { getAuthState } from "@/actions/get-auth-state"
import { getCartState } from "@/actions/get-cart-state"
import { useAuthStore } from "@/stores/auth"
import { useCartStore } from "@/stores/cart"
import { useEffect } from "react"


export const StoreHidration = () =>{
    const authStore=useAuthStore(state=>state)
    useEffect(()=>{
        getAuthState().then(({token})=>{
            if(token)authStore.setToken(token)
            authStore.setHydrated(true)
        })
        getCartState().then(({cart})=>{
            if(cart.length > 0){
                useCartStore.setState({cart})
            }
        })
    },[])
    return null
}