"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { useQueryString } from "@/hooks/use-query-string";
import { useState } from "react";
import { FilterGroup } from "./filter-group";
import { data } from "@/data";
import { ProductItem } from "../layout/product-item";
import { filters } from "@/types/side-bar-category";

export const ProductListFilter = () => {
  const queryString = useQueryString();
  const [filterOpened, setFilterOpened] = useState(false);
  const order = queryString.get("order") ?? "views";

  const handleSelectChange = (value: string) => {
    queryString.set("order", value);
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="text-3xl">
          <strong className="">{data.product.length}</strong> Produto{data.product.length !=1 ? 's' : ''}
        </div>
        <div className="w-full flex flex-row md:max-w-70 gap-5">
          <div className="flex-1">
            <Select defaultValue={order} onValueChange={handleSelectChange}>
              <SelectTrigger className="w-[180px]  md:w-full p-7  flex  items-center bg-black text-white border-gray-200 rounded-sm justify-between">
                <SelectValue placeholder="Ordenar por" className="text-white" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="views">Popularidade</SelectItem>
                <SelectItem value="price">Por preço</SelectItem>
                <SelectItem value="selling">Mais pedidos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div
            onClick={() => setFilterOpened(!filterOpened)}
            className="w-[180px] md:hidden p-6 h-14 flex  items-center bg-black text-white border-gray-200 rounded-sm"
          >
            Filtrar por
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div
          className={`flex-1 md:max-w-70 ${
            filterOpened ? "block" : "hidden"
          } md:block`}
        >
          {filters.map((filter) => (
            <FilterGroup
              key={filter.id}
              id={filter.id}
              name={filter.name}
              items={filter.items}
            />
          ))}
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.product.map((item) => (
            <ProductItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
