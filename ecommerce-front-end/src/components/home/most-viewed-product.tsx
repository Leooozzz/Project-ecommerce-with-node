import { data } from "@/data";
import { ProductList } from "../layout/product-list";
import { getProducts } from "@/actions/get-products";

export const MostViwedProduct = async () => {
  const Products=await getProducts({
    orderBy:'views',
    limit:4
  })


  return (
    <div className="mt-10">
      <h1 className="text-2xl font-medium md:text-2xl flex justify-center md:justify-start">
        Produtos mais vistos
      </h1>
      <p className="text-[#7F7F7F] md:text-lg flex justify-center md:justify-start ">
        Campeões de visualização da nossa loja.
      </p>
      <div className="mt-9">
       <ProductList list={Products}/>
      </div>
    </div>
  );
};
