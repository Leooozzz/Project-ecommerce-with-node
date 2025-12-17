"use client"

import { useCartStore } from "@/stores/cart"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useAuthStore } from "@/stores/auth"
import { ShippingBoxNotLogged } from "./shipping-box-not-logged"
import { ShippingBoxLogged } from "./shipping-box-logged"


export const ShippingBox=()=>{
    const {token,hydrated} =useAuthStore(state=>state)
    const cartStore=useCartStore(state=>state)
    if(!hydrated)return null
    return(
        <div className="flex flex-col gap-3">
            <div className="text-[#7F7F7F] text-base">Calcular frete e prazo</div>
            {!hydrated && <div className="">Carrgando</div>}
            {hydrated &&
            <div className="flex gap-4">
              {!token && <ShippingBoxNotLogged/>}
              {token && <ShippingBoxLogged/>}
            </div>
            }
            {cartStore.shippingDays > 0 &&
            <div className="flex items-center p-6 rounded-sm bg-gray-200">
                <div className="flex-1">Receba em ate {cartStore.shippingDays} {cartStore.shippingDays != 1 ? 'dias úteis' :'dia útil'}</div>
                <div className="text-green-500 font-semibold">R$ {cartStore.shippingCost.toFixed(2)}</div>
            </div>
            }
        </div>
    )
}