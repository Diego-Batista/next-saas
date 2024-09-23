import { z } from 'zod'


export const organizationSchema = z.object({
  __typename: z.literal('Organization').default('Organization'),
  id: z.string(),
  ownerId: z.string()
})

// eslint-disable-next-line prettier/prettier
export type Organization = z.infer<typeof organizationSchema>