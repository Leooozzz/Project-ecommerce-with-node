"use client"

import { Product } from "@/types/Product"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

type Props = {
    data:Product
}
export const ProductItem = ({data}:Props) => {
    const [liked,setLiked]=useState(data.liked)
    return(
        <div className="bg-white border border-gray-200 rounded-sm p-6">
            <div className="flex justify-end">
                <div
                    className="w-10 h-10 border flex justify-center items-center border-gray-100 rounded-sm cursor-pointer"
                    onClick={() => setLiked(!liked)}
                >
                    <Image
                        src={liked ? "/assets/ui/heart-3-fills.png" : "/assets/ui/heart-3-line.png"}
                        alt=""
                        width={24}
                        height={24}
                    />
                </div>
            </div>
           <div className="flex justify-center">
            <Link href={`/product/${data.id}`}>
                <Image src={data.image} alt={data.label} width={200} height={200} className="max-w-full h-48 "/>
            </Link>
           </div>
           <div className="flex justify-center mt-9 text-lg font-bold"><Link href={`/product/${data.id}`}>{data.label}</Link></div>
           <div className="flex justify-center mt-3 text-2xl font-bold"><Link href={`/product/${data.id}`}>R$ {data.price.toFixed(2)}</Link></div>
           <div className="flex justify-center mt-5 text-[#7F7F7F]">Em ate 12X sem juros</div>
        </div>
    )
}