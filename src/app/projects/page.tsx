import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { get } from '@vercel/edge-config'
import { type Project, ProjectCard } from './ui/ProjectCard'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Personal projects',
}

export default async function Projects() {
  const projects: Project[] | undefined = await get('projects')

  return (
    <SimpleLayout
      title="Personal projects."
      intro={
        <>
          <p>
            I&apos;m constantly working on side projects, be it to learn a new
            technology or add to my portfolio. But the strongest motivator for
            me is usually that I want the app for myself. Sometimes, I want
            custom features, don&apos;t want to pay for another service, or want
            more control over my data.
          </p>
          <br />
          <p>
            I&apos;ve worked on tons of little projects over the years but these
            are the ones which I&apos;m most proud of. Some of them are a work
            in progress, some have live demos, and many of them are open-source.
            If you see something that piques your interest, check out the code
            and contribute if you have ideas for how it can be improved.
          </p>
        </>
      }
    >
      <ul role="list" className="mx-auto flex max-w-7xl flex-col gap-y-12">
        {projects &&
          projects.map((project, i) => (
            <ProjectCard key={i++} project={project} />
          ))}
      </ul>
    </SimpleLayout>
  )
}
