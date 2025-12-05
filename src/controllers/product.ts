import { RequestHandler } from "express";
import { getProductSchema } from "../schemas/get-product-schema";
import { getAllProducts, getProduct, getProductsFromSameCategoty, incrementProductView } from "../services/product";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image-url";
import { getOneProductSchema } from "../schemas/get-one-product-schema";
import { getCategory } from "../services/category";
import { getRelatedProductsSchema } from "../schemas/get-related-products-schema";
import { getRelatedProductQuerySchema } from "../schemas/get-one-product-query-schema";

export const getProducts: RequestHandler = async (req, res) => {
  const parseResult = getProductSchema.safeParse(req.query);
  if (!parseResult.success) {
    res.status(400).json({ error: "Parametros invalidos" });
    return;
  }
  const { metadata, orderBy, limit } = parseResult.data;

  const parsedLimit = limit ? parseInt(limit) : undefined;
  const parsedMetadata = metadata ? JSON.parse(metadata) : undefined;
  const products = await getAllProducts({
    metadata: parsedMetadata,
    order: orderBy,
    limit: parsedLimit,
  });
  const productsWithAbsoluteUrl = products.map((product) => ({
    ...product,
    image: product.image ? getAbsoluteImageUrl(product.image) : null,
    liked: false,
  }));
  res.json({ error: null, products: productsWithAbsoluteUrl });
};

export const getOneProduct: RequestHandler = async (req, res) => {
  const paramsResult = getOneProductSchema.safeParse(req.params);
  if (!paramsResult.success) {
    return res.status(400).json({ error: "Parametros invalidos" });
  }
  const { id } = paramsResult.data;
  const product = await getProduct(parseInt(id))
  if(!product){
    return res.json({error:'produto nao encontrado'})
  }
  const productsWithAbsoluteImages = {
    ...product,
    images:product.images.map(img=>getAbsoluteImageUrl(img))
  }

  const category = await getCategory(product.categoryId)

  const incrementViewCount= await incrementProductView(product.id)

  res.json({ error: null,product:productsWithAbsoluteImages,category});
};

export const getRelatedProducts:RequestHandler=async(req,res)=>{
  const paramsResult= getRelatedProductsSchema.safeParse(req.params)
  const queryResult=getRelatedProductQuerySchema.safeParse(req.query)
  if(!paramsResult.success || !queryResult.success){
  return  res.status(400).json({erro:"Parametros invalidos"})
  }
  const { id }=paramsResult.data;
  const { limit }=queryResult.data

  const products=await getProductsFromSameCategoty(parseInt(id), limit ? parseInt(limit): undefined)

  const productsWithAbsoluteUrl=products.map(product=>({
    ...product,
    image: product.image ? getAbsoluteImageUrl(product.image) : null,
    liked: false
  }
  ))
  res.json({error:null,products:productsWithAbsoluteUrl})
}