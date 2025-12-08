export const getStripeWebhookSecret=()=>{
    return process.env.STRIP_WEBHOOK_SECRET || ''
}