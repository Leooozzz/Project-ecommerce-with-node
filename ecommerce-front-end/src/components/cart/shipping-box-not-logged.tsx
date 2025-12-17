import { useCartStore } from "@/stores/cart";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getShippingInfo } from "@/actions/get-shipping-info";

export const ShippingBoxNotLogged = () => {
  const cartStore = useCartStore((state) => state);
  const handleUpdateShipping = async () => {
    if(cartStore.shippingZipcode.length > 4){
        const shippingInfo= await getShippingInfo(cartStore.shippingZipcode)
        if(shippingInfo){
            cartStore.setShippingCost(shippingInfo.cost)
              cartStore.setShippingDays(shippingInfo.days)
        }
    }
  };
  return (
    <div className="flex gap-4">
      <Input
        className="p-6 flex-1 placeholder:text-lg  "
        value={cartStore.shippingZipcode}
        onChange={(e) => cartStore.setShippingZipCode(e.target.value)}
        autoFocus
        placeholder="00000-000"
      />
      <Button onClick={handleUpdateShipping} className="cursor-pointer p-6 text-lg ">
        Calcular
      </Button>
    </div>
  );
};
