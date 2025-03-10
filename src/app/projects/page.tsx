import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { Project, ProjectCard } from './ui/ProjectCard'

const projects: Project[] = [
  {
    name: 'Personal Website',
    demoLink: 'https://samspoerl.com',
    description:
      "The site you're looking at is one of my projects. I built it to introduce myself and showcase my work.",
    stack: 'Next.js | React | Tailwind UI | Tailwind CSS | TypeScript',
    status: 'Prod',
    gitHubLink: 'https://github.com/samspoerl/samspoerl.com',
  },
  {
    name: 'Personal Finance App',
    description:
      "I've already built a prototype to fetch my balances in real time. I plan on releasing a demo and open source code for a simple version of the app that uses the Plaid Sandbox environment (fake data). Look for that to come out soon.",
    stack:
      'Next.js Front-end | Express.js Backend | Prisma ORM | PostgreSQL | Plaid API',
    status: 'Dev',
    // gitHubLink: 'https://github.com/samspoerl/personal-finance-app',
    // demoLink: 'https://finance.samspoerl.com',
  },
  {
    name: 'AI Assistant',
    description:
      "No, I'm not trying to compete with ChatGPT. I'm building this app for greater control of my data, lower cost compared to ChatGPT+, and for custom features. Plus, it's fun to build. I've built a Windows desktop version already using WinUI, and now I'd like to build a version for the web.",
    stack:
      'Next.js | Tailwind CSS | Flowbite React | Plaid | Prisma ORM | MongoDB | OpenAI API',
    status: 'Ideation',
  },
  {
    name: 'Notes App',
    description:
      "One of my biggest frustrations with nearly all of the note-taking apps on the market is that they all depend on title-based organization. Coming up with titles is burdensome and I feel like it stifles my creativity. I want a note-taking and journaling app that is timestamp-based so I don't have to create titles.",
    stack: '',
    status: 'Ideation',
  },
]

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Personal projects',
}

export default function Projects() {
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
        {projects.map((project, i) => (
          <ProjectCard key={i++} project={project} />
        ))}
      </ul>
    </SimpleLayout>
  )
}
