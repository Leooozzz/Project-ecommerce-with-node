import { Router } from "express";
import * as bannerController from '../controllers/banner'
export const routes=Router()

routes.get('/banners',bannerController.getBanner)

