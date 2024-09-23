import { z } from 'zod'

export const roleSchema = z.union([z.literal('ADMIN'), z.literal('MEMBER'), z.literal('BILLING')])

// eslint-disable-next-line prettier/prettier
export type Role = z.infer<typeof roleSchema>

