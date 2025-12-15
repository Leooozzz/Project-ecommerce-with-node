"use client";

import Image from "next/image";
import { useState } from "react";
import { Separator } from "../ui/separator";

type Props = {
  text: string;
};

export const ProductDescription = ({ text }: Props) => {
  const [opened, setOpened] = useState(true);
  return (
    <div className="border-gray-200 px-7 bg-black rounded-md mt-20 p-3">
      <div className="text-white flex justify-between py-7">
        <div className="text-2xl flex items-center">Informações do produto</div>
        <div onClick={()=>setOpened(!opened)} className="cursor-pointer size-14 border border-gray-200 rounded-md flex justify-center items-center">
          <Image
            src={"/assets/ui/arrow-left-s-line.png"}
            alt={""}
            width={24}
            height={24}
            className={`transition-all ${opened ? 'rotate-0' : 'rotate-180'}`}
          />
        </div>
      </div>
      { opened &&  (
        <>
        <Separator /> 
        <div className="text-gray-500 my-12 text-xl">{text}</div>
       </>)}
    </div>
  );
};
