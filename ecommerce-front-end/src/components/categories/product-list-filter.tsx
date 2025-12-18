"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { useQueryString } from "@/hooks/use-query-string";
import { useEffect, useState, useTransition } from "react";
import { FilterGroup } from "./filter-group";
import { data } from "@/data";
import { ProductItem } from "../layout/product-item";
import { Category, CategoryMetadata } from "@/types/category";
import { Product } from "@/types/Product";
import { getProducts } from "@/actions/get-products";
import { Order } from "@/types/order";

type Props = {
  category: Category;
  metadata: CategoryMetadata[];
  filters: any;
};
export const ProductListFilter = ({ category, metadata, filters }: Props) => {
  const queryString = useQueryString();
  const [filterOpened, setFilterOpened] = useState(false);
  const [product, setProduct] = useState<Product[]>([]);
  const [pending,startTransition]=useTransition()
  const order: Order = (queryString.get("order") as Order) ?? "views";
  const fetchProducts = async (filters: any) => {
    filters.order=undefined
    setProduct(
      await getProducts({
        limit: 9,
        metadata: filters,
        orderBy: order,
      })
    );
  };

  useEffect(()=>{
    startTransition(()=>{
      fetchProducts(filters).then()
    })
  },[filters])
  const handleSelectChange = (value: string) => {
    queryString.set("order", value);
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="text-3xl">
          <strong className="">{product.length}</strong> Produto
          {product.length != 1 ? "s" : ""}
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
          {metadata.map((item) => (
            <FilterGroup
              key={item.id}
              id={item.id}
              name={item.name}
              values={item.values}
            />
          ))}
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
          {product.map((item) => (
            <ProductItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
