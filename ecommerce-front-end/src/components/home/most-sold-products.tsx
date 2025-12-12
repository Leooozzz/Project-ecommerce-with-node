import { data } from "@/data";
import { ProductList } from "../layout/product-list";

export const MostSoldProducts = async () => {
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-medium md:text-2xl flex justify-center md:justify-start">
        Produtos mais vendidos
      </h1>
      <p className="text-[#7F7F7F] md:text-lg flex justify-center md:justify-start ">
        Campeões de vendas da nossa loja
      </p>
      <div className="mt-9">
       <ProductList list={data.product}/>
      </div>
    </div>
  );
};
