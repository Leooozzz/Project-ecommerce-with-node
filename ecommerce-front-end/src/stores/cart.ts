import { cartItem } from "@/types/cart-item";
import { create } from "zustand";

export type CartState = {
  cart: cartItem[];
  shippingZipcode: string;
  shippingCost: number;
  shippingDays: number;
  selectAddressId: number | null;
  addItem: (cartItem: cartItem) => void;
  removeItem: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  setShippingZipCode: (zipCode: string) => void;
  setShippingCost: (cost: number) => void;
  setShippingDays: (days: number) => void;
  setSelectedAddressId: (id: number | null) => void;
  clearCart: () => void;
  clearShipping: () => void;
};
export const useCartStore = create<CartState>((set) => ({
  cart: [],
  shippingZipcode: "",
  shippingCost: 0,
  shippingDays: 0,
  selectAddressId: null,
  addItem: ({ productId, quantity }) => set((state) => {
    const existing =state.cart.find(item=> item.productId === productId)
    let newCart;
    if(existing){
       newCart =state.cart.map(item=>{
        if(item.productId===productId){
            return {...item,quantity:item.quantity  + quantity}
        }else{
            return item
        }}
       )
    }else{
        newCart = [...state.cart,{productId,quantity}]
    }
    return {cart:newCart}
  }),

  removeItem: (productId) => set((state) => {
    const newCart = state.cart.filter(item=>item.productId !== productId)
    return{cart:newCart}
  }),

  updateQuantity: (productId, quantity) => set((state) => {
    const newCart =state.cart.map(item=>{
        if(item.productId===productId){
            return {...item,quantity}
        }else{
            return item
        }
    })
    return {cart:newCart}
  }),
  setShippingZipCode: (zipCode) => set({shippingZipcode:zipCode}),
  setShippingCost: (cost) => set({shippingCost:cost}),
  setShippingDays: (days) => set({shippingDays:days}),
  setSelectedAddressId:(id)=>set({selectAddressId:id}),
  clearCart: () => set({cart:[],shippingZipcode:"",shippingCost:0,shippingDays:0,selectAddressId:null}),
  clearShipping: () => set({shippingZipcode:'',shippingCost:0,shippingDays:0,selectAddressId:null}),
}));
