import { ImageSlider } from "@/components/product/image-slide"
import { ProductDescription } from "@/components/product/product-description"
import { ProductsDetails } from "@/components/product/product-details"
import { data } from "@/data"
import Link from "next/link"

type Props= {
   params: Promise<{id:string}>
}
export default async function page ({params}:Props){
   const {id}=await params
 return( 
    <div>
       <div className="text-[#7F7F7F] mb-4">
        <Link href={"/"}>Home</Link> &gt; <Link href={'/'}>Products</Link> &gt; {data.products.label}
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-32">
         <ImageSlider images={data.products.images}/>
         <ProductsDetails product={data.products}/>
      </div>
      <ProductDescription text={data.products.description}/>
      <div className="">
         <h3>Você tambem pode gostar: </h3>
      </div>
    </div>
 )
}