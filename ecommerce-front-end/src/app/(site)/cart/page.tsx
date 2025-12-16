"use server";

import { getCartState } from "@/actions/get-cart-state";
import { getProductsFromList } from "@/actions/get-products-from-list";
import { CartContainer } from "@/components/cart/cart-container";

import { CartListItem } from "@/types/cart-list-item";
import { redirect } from "next/navigation";

export default async function Page() {
  const { cart: initialCart } = await getCartState();

  if (initialCart.length === 0) {
    redirect("/");
    return null;
  }
  let cartProducts: CartListItem[] = [];
  let subtotal: number = 0;
  const ids = initialCart.map((item) => item.productId);
  const products = await getProductsFromList(ids);

  for (let cartItem of initialCart) {
    let productIndex = products.findIndex((i) => i.id === cartItem.productId);
    if (productIndex > -1) {
      cartProducts.push({
        product: products[productIndex],
        quantity: cartItem.quantity,
      });
      subtotal += products[productIndex].price * cartItem.quantity;
    }
  }

  return (
    <div>
      <CartContainer
        initialCartProducts={cartProducts}
        initialSubtotal={subtotal}
      />
    </div>
  );
}
