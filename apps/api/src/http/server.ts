import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { env } from '@saas/env'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import { authenticateWithGithub } from './routes.ts/auth/authenticate-with-github'
import { authenticateWithPassword } from './routes.ts/auth/authenticate-with-password'
import { createAccount } from './routes.ts/auth/create-account'
import { getProfile } from './routes.ts/auth/get-profile'
import { requestPasswordRecover } from './routes.ts/auth/request-password-recover'
import { resetPassword } from './routes.ts/auth/reset-password'
import { getOrganizationBilling } from './routes.ts/billing/get-organization-billing'
import { acceptInvite } from './routes.ts/invites/accept-invite'
import { createInvite } from './routes.ts/invites/create-invites'
import { getInvite } from './routes.ts/invites/get-invite'
import { getInvites } from './routes.ts/invites/get-invites'
import { getPendingInvites } from './routes.ts/invites/get-pending-invites'
import { rejectInvite } from './routes.ts/invites/reject-invite'
import { revokeInvite } from './routes.ts/invites/revoke-invite'
import { getMembers } from './routes.ts/members/get-members'
import { removeMember } from './routes.ts/members/remove-member'
import { updateMember } from './routes.ts/members/update-member'
import { createOrganization } from './routes.ts/orgs/create-organization'
import { getMembership } from './routes.ts/orgs/get-membership'
import { getOrganization } from './routes.ts/orgs/get-organization'
import { getOrganizations } from './routes.ts/orgs/get-organizations'
import { shutdownOrganization } from './routes.ts/orgs/shutdown-organization'
import { transferOrganization } from './routes.ts/orgs/transfer-organization'
import { updateOrganization } from './routes.ts/orgs/update-organization'
import { createProject } from './routes.ts/projects/cretae-projects'
import { deleteProject } from './routes.ts/projects/delete-project'
import { getProject } from './routes.ts/projects/get-project'
import { getProjects } from './routes.ts/projects/get-projects'
import { updateProject } from './routes.ts/projects/update-project'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS',
      description: 'Full-stack SaaS with multi-tenant & RBAC.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyCors)

app.register(createAccount)
app.register(authenticateWithPassword)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)
app.register(authenticateWithGithub)

app.register(createOrganization)
app.register(getMembership)
app.register(getOrganization)
app.register(getOrganizations)
app.register(updateOrganization)
app.register(shutdownOrganization)
app.register(transferOrganization)

app.register(createProject)
app.register(deleteProject)
app.register(getProject)
app.register(getProjects)
app.register(updateProject)

app.register(getMembers)
app.register(updateMember)
app.register(removeMember)
app.register(createInvite)
app.register(getInvite)
app.register(getInvites)
app.register(acceptInvite)
app.register(rejectInvite)
app.register(revokeInvite)
app.register(getPendingInvites)

app.register(getOrganizationBilling)

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})
