import { GitHubIcon } from '@/components/SocialIcons'
import { StatusTracker, type ProjectStatus } from '@/components/StatusTracker'
import { ExternalLinkIcon } from 'lucide-react'

export interface Project {
  name: string
  description: string
  stack: string
  status: ProjectStatus
  gitHubLink?: string
  demoLink?: string
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-lg bg-white p-6 shadow-xl dark:bg-zinc-900 dark:shadow-2xl dark:shadow-zinc-950">
      <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
        {project.name}
      </p>
      {project.demoLink && (
        <a
          href={project.demoLink}
          target="_blank"
          className="w-fit text-sm font-semibold text-zinc-800 hover:text-zinc-400 dark:text-zinc-100"
        >
          <div className="flex flex-row items-center gap-2">
            <p>{project.demoLink.replace('https://', '')}</p>
            <ExternalLinkIcon size={16} />
          </div>
        </a>
      )}
      <StatusTracker currentStatus={project.status} />
      <p className="text-pretty text-sm text-zinc-600 dark:text-zinc-400">
        {project.description}
      </p>
      <div className="mt-4 flex grow flex-row items-end justify-between gap-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {project.stack}
        </p>
        {project.gitHubLink && (
          <a
            href={project.gitHubLink}
            target="_blank"
            className="self-end"
            aria-label="View repository on GitHub"
          >
            <GitHubIcon className="h-6 w-6 fill-zinc-800 transition hover:fill-zinc-400 dark:fill-zinc-100" />
          </a>
        )}
      </div>
    </div>
  )
}
