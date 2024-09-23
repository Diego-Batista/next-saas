import { z } from "zod"

import { projectSchema } from "../models/project"

export const projectSubject = z.tuple([
    z.union([z.literal('get'), z.literal('create'), z.literal('delete'), z.literal('manage'), z.literal('update'),]),
    z.union([z.literal('Project'), projectSchema])
])

// eslint-disable-next-line prettier/prettier
export type ProjectSubject = z.infer<typeof projectSubject>
