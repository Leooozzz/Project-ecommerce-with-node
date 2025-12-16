import { CartListItem } from "@/types/cart-list-item";
import Image from "next/image";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/cart";
import { setCartState } from "@/actions/set-cart-state";

type Props = {
  item: CartListItem;
};

export const CartProductItem = ({ item }: Props) => {

    const cartStore=useCartStore(state=>state)
    const updtadeCookie=async ()=>{
        const updateCart = useCartStore.getState().cart
        await setCartState(updateCart)
    }

    const handleMinus = async ()=>{
        if(item.quantity > 1){
        cartStore.updateQuantity(item.product.id,item.quantity - 1)
        await updtadeCookie()
        }else{
            await handleremove()
        }
    }
    const handlePlus = async ()=>{
        cartStore.updateQuantity(item.product.id,item.quantity + 1)
        await updtadeCookie()
    }
    const handleremove= async ()=>{
        cartStore.removeItem(item.product.id)
        await updtadeCookie()

    }
    

  return (
    <div className="flex p-6 items-center bg-gray-100 rounded-sm gap-4 md:gap-8 border-0 md:border-b border-b-gray-400">
      <div className="border border-gray-400 rounded-sm">
        <Image
          src={item.product.image}
          alt={item.product.label}
          width={96}
          height={96}
          className="rounded-sm size-24 md:size-16"
        />
      </div>
      <div className="flex-1 flex flex-col md:flex-row justify-between md:items-center">
        <div>
          <div className="text-sm">{item.product.label}</div>
          <div className="hidden md:block text-xs text-gray-500 mt-2">COD:{item.product.id}</div>
        </div>
        <div>
            <div className="flex border border-gray-200 rounded-sm text-center ">
                <div onClick={handleMinus} className="cursor-pointer size-10 flex justify-center items-center">-</div>
                <div className="size-10 border-x border-x-gray-200 flex justify-center items-center">{item.quantity}</div>
                <div onClick={handlePlus} className="cursor-pointer size-10 flex justify-center items-center">+</div>
            </div>
        </div>
      </div>
      <div className="w-24 md:w-40  flex flex-col md:flex-row justify-between md:items-center items-end">
        <div className="text-sm ">R$ {item.product.price.toFixed(2)}</div>
        <div>
          <div onClick={handleremove} className="size-12 border border-gray-400 rounded-sm flex justify-center items-center">
            <Image src={"/assets/ui/trash.png"} alt={""} height={24} width={24} />
          </div>
        </div>
      </div>
    </div>
  );
};
