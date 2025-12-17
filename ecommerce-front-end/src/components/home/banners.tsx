"use client";

import { useEffect, useState } from "react";
import { Banner } from "@/types/banner";
import Image from "next/image";
import Link from "next/link";

type Props = {
  list: Banner[];
};
let bannerTime:NodeJS.Timeout

export const Banners = ({ list }: Props) => {

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () =>{
    setCurrentImage(currentImage => {
      if(currentImage + 1 >= list.length){
        return 0
      }else{
        return currentImage + 1
      }
    })
  }
  const handleBannerClick = (index:number)=>{
    setCurrentImage(index)
    clearInterval(bannerTime)
    bannerTime = setInterval(nextImage,3000)
  }

  useEffect(()=>{
     bannerTime = setInterval(nextImage,3000)
     return ()=>clearInterval(bannerTime)
  },[])
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="relative aspect-3/1 overflow-hidden rounded-md shadow-lg">
        {list.map((banner, index) => (
          <Link
            key={index}
            href={banner.link}
            className="absolute inset-0 transition-all object-cover"
            style={{
              opacity: currentImage === index ? 1 : 0
            }}
          >
            <Image
              src={banner.img}
              alt="Imagens de banner"
              height={400}
              width={1200}
              className="w-full h-full object-center"
              unoptimized
            />
          </Link>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-4">
        {list.map((banner,index)=>(
          <div key={index}
          className="size-3 bg-black rounded-full cursor-pointer"
          style={{
              opacity: currentImage === index ? 1 : 0.4
            }}
            onClick={()=>handleBannerClick(index)}
            >

          </div>
        ))}
      </div>
    </div>
  );
};
