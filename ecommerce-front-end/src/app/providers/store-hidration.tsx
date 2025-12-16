"use client"

import { getCartState } from "@/actions/get-cart-state"
import { useCartStore } from "@/stores/cart"
import { useEffect } from "react"


export const StoreHidration = () =>{
    useEffect(()=>{
        getCartState().then(({cart})=>{
            if(cart.length > 0){
                useCartStore.setState({cart})
            }
        })
    },[])

    return null
}