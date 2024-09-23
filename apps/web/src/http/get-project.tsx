/* eslint-disable prettier/prettier */
import { api } from './api-client';

interface GetProjectResponse {
    project: {
        name: string;
        id: string;
        slug: string;
        avatarUrl: string | null;
        ownerId: string;
        organizationId: string;
        description: string;
        owner: {
            name: string | null;
            id: string;
            avatarUrl: string | null;
        };
    }
}

export async function getProject(org: string, projectSlug: string) {
  
  const result = await api
    .get(`organizations/${org}/projects/${projectSlug}`)
    .json<GetProjectResponse>()

  return result
}