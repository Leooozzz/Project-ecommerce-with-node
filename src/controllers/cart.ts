import { RequestHandler } from "express";
import { cartMountSchema } from "../schemas/cart-mount-schmea";
import { getProduct } from "../services/product";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image-url";
import { calculateShippingSchema } from "../schemas/calculate-shipping-schema";
import { cartFinishSchema } from "../schemas/cart-finish-schema";
import { getAddressesById } from "../services/user";
import { createOrder } from "../services/order";
import { createPaymentLink } from "../services/payment";

export const cartMount: RequestHandler = async (req, res) => {
  const parseResult = cartMountSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: "Array de ids invalido" });
  }

  const { ids } = parseResult.data;

  let products = [];
  for (let id of ids) {
    const product = await getProduct(id);
    if (product) {
      products.push({
        id: product.id,
        label: product.label,
        price: product.price,
        image: product.images[0]
          ? getAbsoluteImageUrl(product.images[0])
          : null,
      });
    }
  }
  res.json({ error: null, products });
};

export const calculateShipping: RequestHandler = async (req, res) => {
  const parseResult = calculateShippingSchema.safeParse(req.query);
  if (!parseResult.success) {
    return res.status(400).json({ error: "Cep invalido" });
  }

  const { zipcode } = parseResult.data;

  res.json({ error: null, zipcode, cost: 7, day: 3 });
};

export const finish: RequestHandler = async (req, res) => {
  const userId = (req as any).userId;
  if (!userId) {
    return res.status(401).json({ error: "Acesso negado" });
  }

  const result = cartFinishSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Carrinho inexistente" });
  }
  const { cart, addressId } = result.data;
  const address = await getAddressesById(userId,addressId)
  if(!address){
    return res.status(400).json({error:"Endereço invalido"})
  }
  const shippingCost=7
  const shippingDays=3

  const orderId = await createOrder({
    userId,
    address,
    shippingCost,
    shippingDays,
    cart
  })

  if(!orderId){
    return res.status(400).json({error:"Ocorreu um erro"})
  }
  const url = await createPaymentLink({
    cart,shippingCost,orderId
  })
  if(!url){
    return res.status(400).json({error:"Ocorreu um erro"})
  }
  res.json({ error: null,url });
};
