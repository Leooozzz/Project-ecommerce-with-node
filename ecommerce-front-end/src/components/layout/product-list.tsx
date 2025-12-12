import { Product } from "@/types/Product";
import { ProductItem } from "./product-item";

type Props = {
    list:Product[];
}
export const ProductList = ({list}:Props) => {
    return(
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {list.map(item => (
                <ProductItem key={item.id} data={item}/>
            ))}
        </div>
    )

};
