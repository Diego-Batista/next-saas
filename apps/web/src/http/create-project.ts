/* eslint-disable prettier/prettier */
import { api } from './api-client';

interface createProjectRequest {
  org: string;
  name: string;
  description: string;
}

type createProjectResponse = void

export async function createProject({
  org,
  name,
  description,
}: createProjectRequest): Promise<createProjectResponse> {
  await api
    .post(`organizations/${org}/projects`, {
      json: {
        name,
        description,
      },
    })
    .json<createProjectResponse>()
}
