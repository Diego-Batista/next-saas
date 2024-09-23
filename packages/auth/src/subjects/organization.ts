import { z } from "zod"

import { organizationSchema } from "../models/organization"

export const organizationSubject = z.tuple([
    z.union([z.literal('delete'), z.literal('manage'), z.literal('update'), z.literal('transfer_ownership'),]),
    z.union([ z.literal('Organization'), organizationSchema]),
])

// eslint-disable-next-line prettier/prettier
export type OrganizationSubject = z.infer<typeof organizationSubject>