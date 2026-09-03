import { GitHubIcon } from '@/components/SocialIcons'
import { StatusTracker, type ProjectStatus } from '@/components/StatusTracker'
import clsx from 'clsx'
import { ExternalLinkIcon } from 'lucide-react'

export interface Project {
  name: string
  description: string
  stack: string
  status: ProjectStatus
  gitHubLink?: string
  demoLink?: string
  // Set in Edge Config, read only by the home page's featured section. Optional
  // so a project that predates the flag is simply not featured.
  isFeatured?: boolean
}

/**
 * `card` is the standalone treatment the projects page grid uses, matching the
 * bordered containers on the home page. `plain` drops the border so the card
 * can sit inside one of those containers, where a second border reads as
 * nesting.
 */
export function ProjectCard({
  project,
  variant = 'card',
}: {
  project: Project
  variant?: 'card' | 'plain'
}) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-2',
        variant === 'card' &&
          'rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40'
      )}
    >
      <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
        {project.name}
      </p>
      {/* Always a line here, so the trackers and every row below them align
          across a grid of cards. The tracker already says which stage a project
          is at, so this line answers the other question — whether there's
          anywhere to go and look — rather than repeating the stage. */}
      {project.demoLink ? (
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
      ) : (
        <p className="text-sm font-semibold text-zinc-400 dark:text-zinc-500">
          Not public yet
        </p>
      )}
      <StatusTracker currentStatus={project.status} />
      <p className="text-sm text-pretty text-zinc-600 dark:text-zinc-400">
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
