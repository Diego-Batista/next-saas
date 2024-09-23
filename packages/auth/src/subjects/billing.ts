import { z } from "zod"

export const billingSubject = z.tuple([
    z.union([z.literal('export'), z.literal('manage'), z.literal('get')]),
    z.literal('Billing'),
])

// eslint-disable-next-line prettier/prettier
export type BillingSubject = z.infer<typeof billingSubject>