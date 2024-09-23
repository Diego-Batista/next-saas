import 'fastify'

import { Member, Organization } from '@prisma/client'

declare module 'fastify' {
    // eslint-disable-next-line prettier/prettier
    export interface FastifyRequest {
        getCurrentUserId(): Promise<string>
        getUserMembership(slug: string): Promise<{ organization: Organization, membership: Member }>
    }
}