"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectIcon, SelectTrigger } from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
export const ProductListFilter = () => {

    const [filterOpened,setFilterOpened]=useState(false)

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="text-3xl">
          <strong className="">99</strong> Produtos
        </div>
        <div className="w-full flex flex-row md:max-w-70 gap-5">
          <div className="flex-1">
            <Select>
              <SelectTrigger className="w-[180px] md:w-full px-6 h-14 flex  items-center bg-black text-white border-gray-200 rounded-sm justify-between">
                <SelectValue placeholder="Ordenar por" />
                <SelectIcon>
                  <ChevronDown className="h-5 w-5 text-white" />
                </SelectIcon>
              </SelectTrigger>
            </Select>
          </div>
          <div onClick={()=>setFilterOpened(!filterOpened)} className="w-[180px] md:hidden px-6 h-14 flex  items-center bg-black text-white border-gray-200 rounded-sm">
            Filtrar por
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className={`flex-1 md:max-w-70 bg-red-200 ${filterOpened ? 'block' : 'hidden'} md:block`}>Filtros</div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3">
          <div>...</div>
          <div>...</div>
          <div>...</div>
          <div>...</div>
          <div>...</div>
        </div>
      </div>
    </div>
  );
};
