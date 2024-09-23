import { roleSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permission'

import { UnauthorizedError } from '../_erros/unauthoriezd-error'

export async function getMembers(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/members',
      {
        schema: {
          tags: ['members'],
          sumary: 'Get all organization members.',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              members: z.array(
                z.object({
                  userId: z.string().uuid(),
                  id: z.string().uuid(),
                  role: roleSchema,
                  name: z.string().nullable(),
                  avatarUrl: z.string().url().nullable(),
                  email: z.string().email(),
                }),
              ),
            }),
          },
        },
      },
      async (request, replay) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'User')) {
          throw new UnauthorizedError(
            'You re not allowed to see organization members.',
          )
        }

        const members = await prisma.member.findMany({
          where: {
            organizationId: organization.id,
          },
          orderBy: {
            role: 'asc',
          },
          select: {
            id: true,
            role: true,
            user: {
              select: {
                email: true,
                id: true,
                avatarUrl: true,
                name: true,
              },
            },
          },
        })

        const membersWithRoles = members.map(
          ({ user: { id: userId, ...user }, ...member }) => {
            return {
              ...user,
              ...member,
              userId,
            }
          },
        )

        return replay.send({ members: membersWithRoles })
      },
    )
}
