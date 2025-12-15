"use client";

import { ProductComplete } from "@/types/Product";
import { Button } from "../ui/button";
import Image from "next/image";
import { useState } from "react";

type Props = {
  product: ProductComplete;
};
export const ProductsDetails = ({ product }: Props) => {
  const [liked, setLiked] = useState(product.liked);
  const addToCart = async () => {};

  return (
    <div className="flex-1">
      <div className="text-xs text-[#7F7F7F] mb-2">Cod:{product.id}</div>
      <div className="text-3xl mb-6">{product.label}</div>
      <div className="font-semibold text-3xl mb-2">
        R$ {product.price.toFixed(2)}
      </div>
      <div className="text-sm text-[#7F7F7F] mb-6">Em ate 12X no cartão</div>
      <div className="flex gap-4">
        <Button
          className="bg-black p-7 hover:opacity-90 cursor-pointer flex-1 max-w-xs"
          onClick={addToCart}
        >
          Adicionar ao carrinho
        </Button>
        <div
          className=" cursor-pointer border border-gray-200 flex justify-center items-center rounded-sm size-14"
          onClick={() => setLiked(!liked)}
        >
          <Image
            src={
              liked
                ? "/assets/ui/heart-3-fills.png"
                : "/assets/ui/heart-3-line.png"
            }
            alt={""}
            height={24}
            width={24}
          />
        </div>
        <div className="cursor-pointer border border-gray-200 flex justify-center items-center rounded-sm size-14">
          <Image
            src={"/assets/ui/share-line.png"}
            alt={""}
            height={24}
            width={24}
          />
        </div>
      </div>
    </div>
  );
};
