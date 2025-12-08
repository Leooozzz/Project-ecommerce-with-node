import { RequestHandler } from "express";
import { getStripeWebhookSecret } from "../utils/get-stripe-webhook-secret";
import { getConstructEvent } from "../libs/stripe";

export const stripe:RequestHandler=async(req,res)=>{

    const sig = req.headers['strip-signature'] as string
    const webhookKey=getStripeWebhookSecret()
    const rawBody=req.body

    const event= await getConstructEvent(rawBody,sig,webhookKey)
    if(event){
    console.log('Evento: ',event?.type)
    }else{
        console.log('Nao deu evento...')
    }
    res.json({error:null})
}