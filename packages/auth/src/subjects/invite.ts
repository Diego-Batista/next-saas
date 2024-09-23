import { z } from "zod"

export const inviteSubject = z.tuple([
    z.union([z.literal('create'), z.literal('delete'), z.literal('manage'), z.literal('get')]),
    z.literal('Invite'),
])

// eslint-disable-next-line prettier/prettier
export type InviteSubject = z.infer<typeof inviteSubject>