'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { getProjects } from '@/http/get-projects'

export function CardProject() {
  const { slug: orgSlug, project: projectSlug } = useParams<{
    slug: string,
    project: string,
  }>()

  const { data } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: () => getProjects(orgSlug),
    enabled: !!orgSlug,
  })

  const currentProject =
    data && projectSlug
      ? data.projects.find((project) => project.slug === projectSlug)
      : null
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{currentProject?.name}</h1>
      <h1 className="text-2xl font-bold">{currentProject?.description}</h1>
      <h1 className="text-2xl font-bold">{currentProject?.createdAt}</h1>
    </div>
  )
}
