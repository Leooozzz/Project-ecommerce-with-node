
import { ProductList } from "../layout/product-list"
import { getRelatedProducts } from "@/actions/get-related-products"

type Props ={
    id:number
}
export const RelatedProducts = async ({id}:Props) =>{
    const product=await getRelatedProducts(id)
    return(
        <div className="mt-10">
            <h3 className="text-2xl">Você tambem vai gostar</h3>
            <div className="mt-9">
                <ProductList  list={product} />
            </div>
        </div>
    )
}