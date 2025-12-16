"use client";

import { useCartStore } from "@/stores/cart";
import { CartListItem } from "@/types/cart-list-item";
import Image from "next/image";
import { useEffect } from "react";
import { CartProductList } from "./cart-product-list";

type Props = {
  initialCartProducts: CartListItem[];
  initialSubtotal: number;
};

export const CartContainer = ({
  initialCartProducts,
  initialSubtotal,
}: Props) => {
  const cartStore = useCartStore((state) => state);

    useEffect(()=>{cartStore.clearShipping()},[])

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
          Seu carrinho de compras <span className="text-gray-500">({cartStore.cart.length} {cartStore.cart.length != 1 ? 'itens' : 'item'})</span>
        </div>
      </div>
      <div className="flex flex-col gap-8 md:flex-row mt-9">
            <div className="flex-1">
                <CartProductList initialList={initialCartProducts}/>
            </div>
            <div className="flex-1 md:max-w-sm">
                Info
            </div>
      </div>
    </div>
  );
};
