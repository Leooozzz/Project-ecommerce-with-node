import { Router } from "express";
import * as bannerController from '../controllers/banner'
import * as productsController from '../controllers/product'
import * as categoryController from '../controllers/category'


export const routes=Router()

routes.get('/banners',bannerController.getBanner)
routes.get('/products',productsController.getProducts)
routes.get('/product/:id',productsController.getOneProduct)
routes.get('/products/:id/related',productsController.getRelatedProducts)
routes.get('/category/:slug/metadata',categoryController.getCategoryWithMetadata)