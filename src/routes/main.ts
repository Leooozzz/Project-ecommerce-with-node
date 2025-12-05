import { Router } from "express";
import * as bannerController from '../controllers/banner'
import * as productsController from '../controllers/product'
import * as categoryController from '../controllers/category'
import * as cartController from '../controllers/cart'
import * as userController from '../controllers/user'

export const routes=Router()

routes.get('/banners',bannerController.getBanner)
routes.get('/products',productsController.getProducts)
routes.get('/product/:id',productsController.getOneProduct)
routes.get('/products/:id/related',productsController.getRelatedProducts)
routes.get('/category/:slug/metadata',categoryController.getCategoryWithMetadata)
routes.post('/cart/mount',cartController.cartMount)
routes.get('/cart/shipping',cartController.calculateShipping)
routes.post('/user/register',userController.register)
routes.post('/user/login',userController.login)
routes.post('/user/addresses',userController.addRess)