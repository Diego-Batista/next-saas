import { z } from 'zod'

import { roleSchema } from '../roles'

export const userSchema = z.object({
  id: z.string(),
  role: roleSchema
})

// eslint-disable-next-line prettier/prettier
export type User = z.infer<typeof userSchema>
