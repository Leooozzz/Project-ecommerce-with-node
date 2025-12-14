"use client"
import Image from "next/image";
import { FilterItem } from "./filter-item";
import { useState } from "react";

type Props ={
    id:string,
    name:string
}
export const FilterGroup = ({id,name}:Props) => {
    const [opened,setOpened]=useState(true)
  return (
    <div className="mb-8">
      <div className=" flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
        <div className="flex-1 font-bold text-xl">{name}</div>
        <div className="size-8 flex  justify-center items-center cursor-pointer" onClick={()=>setOpened(!opened)}>
            <Image src={"/assets/ui/arrow-left-s-line.png"} alt={""} width={24} height={24} className={`${opened ? 'rotate-0' : 'rotate-180'} transition-all`}/>
        </div>
      </div>

      <div className={` flex flex-col gap-4 overflow-y-hidden ${opened ? 'h-auto' : 'h-0' } transition-all`}>
        <FilterItem groupId={id} item={{id:1,label:'item1'}}/>
        <FilterItem groupId={id} item={{id:2,label:'item 2'}}/>
        <FilterItem groupId={id} item={{id:3,label:'item 3'}}/>
      </div>
    </div>
  );
};
