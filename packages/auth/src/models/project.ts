import { z } from 'zod'


export const projectSchema = z.object({
  __typename: z.literal('Project').default('Project'),
  id: z.string(),
  ownerId: z.string()
})

// eslint-disable-next-line prettier/prettier
export type Project = z.infer<typeof projectSchema>