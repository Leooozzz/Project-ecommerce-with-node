import { RequestHandler } from "express";
import { getAllBanners } from "../services/banner";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image-url";

export const getBanner:RequestHandler=async (req,res)=>{
    const banners= await getAllBanners()
    const  bannerWithAbsoluteUrl= banners.map(banner=>({
        ...banner,
        img:getAbsoluteImageUrl(banner.img)
    }))
    res.json({error:null,banners:bannerWithAbsoluteUrl})
}