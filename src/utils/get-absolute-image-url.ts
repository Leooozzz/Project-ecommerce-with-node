import { getBaseUrl } from "./get_baseUrl"

export const getAbsoluteImageUrl=(path:string)=>{
    return `${getBaseUrl()}/${path}`
}