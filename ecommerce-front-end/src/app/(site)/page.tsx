import { getBanner } from "@/actions/get-banners";
import { Banners } from "@/components/home/banners";
import { MostSoldProducts } from "@/components/home/most-sold-products";
import { MostViwedProduct } from "@/components/home/most-viewed-product";
import { ProductListSkeleton } from "@/components/home/product-list-skeleton";
import Image from "next/image";
import { Suspense } from "react";

const Page =async () => {
  const banner=await getBanner()
  return (
    <div>
      <Banners list={banner} />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 md:gap-8 mt-6 md:mt-12 justify-between">
        <div className="flex-1">
          <div className="border p-6 flex gap-9 border-gray-200 rounded-sm">
            <div className="flex justify-center items-center ">
              <Image
                src={"/assets/ui/truck-lines.png"}
                alt={""}
                width={40}
                height={40}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">Frete Grátis</h1>
              <p className="text-sm text-[#7F7F7F]">Para toda São Paulo</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="border p-6 flex gap-9 border-gray-200 rounded-sm">
            <div className="flex justify-center items-center ">
              <Image
                src={"/assets/ui/discount-percent-lines.png"}
                alt={""}
                width={40}
                height={40}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">Muitas ofertas</h1>
              <p className="text-sm text-[#7F7F7F]">Ofertas imbatíveis</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="border p-6 flex gap-9 border-gray-200 rounded-sm">
            <div className="flex justify-center items-center ">
              <Image
                src={"/assets/ui/arrow-left-right-lines.png"}
                alt={""}
                width={40}
                height={40}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">Troca fácil</h1>
              <p className="text-sm text-[#7F7F7F]">No período de 30 dias.</p>
            </div>
          </div>
        </div>
      </div>
     <Suspense fallback={<ProductListSkeleton/>}>
      <MostViwedProduct/>
     </Suspense>
      <Suspense fallback={<ProductListSkeleton/>}>
    <MostSoldProducts/>
     </Suspense>
     
    </div>
    
  );
};

export default Page;
