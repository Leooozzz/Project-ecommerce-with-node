"use client";

import { useCartStore } from "@/stores/cart";
import { CartListItem } from "@/types/cart-list-item";
import Image from "next/image";
import { useEffect } from "react";
import { CartProductList } from "./cart-product-list";
import { FinishPurchaseButton } from "./finish-purchase-button";
import Link from "next/link";

type Props = {
  initialCartProducts: CartListItem[];
  initialSubtotal: number;
};

export const CartContainer = ({
  initialCartProducts,
  initialSubtotal,
}: Props) => {
  const cartStore = useCartStore((state) => state);

  useEffect(() => {
    cartStore.clearShipping();
  }, []);

  let total = initialSubtotal + cartStore.shippingCost;

  return (
    <div>
      <div className="flex items-center gap-2">
        <Image
          src={"/assets/ui/shopping-bag-4-line-black.png"}
          alt={""}
          height={24}
          width={24}
        />
        <div className="text-lg">
          Seu carrinho de compras{" "}
          <span className="text-gray-500">
            ({cartStore.cart.length}{" "}
            {cartStore.cart.length != 1 ? "itens" : "item"})
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-8 md:flex-row mt-9">
        <div className="flex-1">
          <CartProductList initialList={initialCartProducts} />
        </div>
        <div className="flex-1 md:max-w-sm flex flex-col gap-4">
          <div className="bg-gray-100 border border-gray-200 rounded-sm ">
            <div className="border-b border-gray-200 p-6">
              <div className="flex justify-between items-center mb-5">
                <div>SUBTOTAL</div>
                <div className="font-bold">R$ {initialSubtotal.toFixed(2)}</div>
              </div>
              <div className="flex justify-between items-center">
                <div>FRETE</div>
                <div className="font-bold">
                  R$ {cartStore.shippingCost.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <div>TOTAL</div>
                <div className="font-bold text-2xl">R$ {total.toFixed(2)}</div>
              </div>
              <div className="text-right text-xs text-[#7F7F7F] mb-5">
                Em ate 12X no cartão
              </div>
              <FinishPurchaseButton/>
              <Link href={"/"} className="text-xs text-[#7F7F7F] flex justify-center items-center mt-6" >Comprar outros produtos</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
