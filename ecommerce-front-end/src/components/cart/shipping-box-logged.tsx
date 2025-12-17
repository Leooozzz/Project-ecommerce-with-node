"use client";
import { useCartStore } from "@/stores/cart";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { Address } from "@/types/address";
import { useAuthStore } from "@/stores/auth";
import { getUserAddresses } from "@/actions/get-user-address";
import { getShippingInfo } from "@/actions/get-shipping-info";
import { AddRessModal } from "./address-modal";
import { addUserAddress } from "@/actions/add-user-address";

export const ShippingBoxLogged = () => {
  const { token, hydrated } = useAuthStore((state) => state);
  const cartStore = useCartStore((state) => state);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [pending, startTransition] = useTransition();
  const [modalOpened,setModalOpened]=useState(false)

  const updateShippingInfo=async()=>{
    if(cartStore.shippingZipcode.length > 4){
      const shippingInfo=await getShippingInfo(cartStore.shippingZipcode)
      if(shippingInfo){
        cartStore.setShippingCost(shippingInfo.cost)
        cartStore.setShippingDays(shippingInfo.days)
      }
    }
  }


  useEffect(() => {
    if (hydrated && token) {
      startTransition(() => {
        getUserAddresses(token).then(setAddresses);
      });
    }
  }, [token, hydrated]);

  useEffect(()=>{
    if(cartStore.selectAddressId){
      updateShippingInfo()
    }
  },[cartStore.selectAddressId,cartStore.shippingDays])

  const handleSelectAddress =async(e:ChangeEvent <HTMLSelectElement>)=>{
      cartStore.clearShipping()
      const id = parseInt(e.target.value)
      if(id){
        const address=addresses.find(addresses=>addresses.id === id)
        if(address){
          cartStore.setShippingZipCode(address.zipcode)
          cartStore.setSelectedAddressId(id)
        }
      }
  } 

  const handleAddress=async(address:Address)=>{
    if(!token) return 
    const newAddresses=await addUserAddress(token,address)
    if(newAddresses){
      setAddresses(newAddresses)
      setModalOpened(false)
    }
  }
  return (


      <div className="flex flex-col  gap-2 w-full ">
        <select
        value={cartStore.selectAddressId ?? ''}
        onChange={handleSelectAddress}
        className="py-4 rounded-md bg-gray-200 text-sm  "
        >
            <option value="" >{addresses.length === 0 ? 'Nenhum endereço cadastrado' : 'Selecione um endereço'}</option>
            {addresses.map(item=>(
                <option key={item.id} value={item.id}>
                    {item.street}, {item.number}- {item.city} ({item.zipcode})
                </option>
            ))}
        </select>
         <Button onClick={()=>setModalOpened(true)} className="cursor-pointer bg-white text-black text-sm w-full hover:bg-white">Adicionar novo endereço</Button>
          <AddRessModal opened={modalOpened} onClose={()=>setModalOpened(false)} onAdd={handleAddress}/>
      </div>

  );
};
