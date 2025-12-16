"use client";

import { useAuthStore } from "@/stores/auth";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/cart";
import Link from "next/link";
import { finishCart } from "@/actions/finish-cart";
import { clearCartCookie } from "@/actions/clear-cart-cookie";
import { redirect } from "next/navigation";

export const FinishPurchaseButton = () => {
  const { token, hydrated } = useAuthStore((state) => state);
  const cartStore = useCartStore((state) => state);

  const handleFinishButton = async () => {
    if (!token || !cartStore.selectAddressId) return;
    const sessionURL=await finishCart(
        token,
        cartStore.selectAddressId,
        cartStore.cart
    )
    if(sessionURL){
        await clearCartCookie()
        cartStore.clearCart()
        redirect(sessionURL)
    }else{
        alert('ocorreu um erro')
    }
  };

  if (!hydrated) return null;
  if (!token) {
    return (
      <Link href={"/login"}>
        <Button className="cursor-pointer w-full p-7 bg-black ">
          Faça login para finalizar
        </Button>
      </Link>
    );
  }

  return (
    <Button
      disabled={!cartStore.selectAddressId ? true : false}
      onClick={handleFinishButton}
      className="cursor-pointer w-full p-7 bg-black disabled:opacity-20"
    >
      Finalizar compra
    </Button>
  );
};
