import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { type Project, ProjectCard } from '@/components/ProjectCard'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn/accordion'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { Stack, TechLayer } from '@/components/Stack'
import logoBdoUsa from '@/images/logos/bdo-usa.svg'
import logoDirectSupply from '@/images/logos/direct-supply.svg'
import heroImage from '@/images/photos/headshot-black-tshirt.jpg'
import { get } from '@vercel/edge-config'
import React from 'react'

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function CodeBracketSquareIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-teal-500 dark:fill-zinc-400 dark:group-hover:fill-teal-400" />
    </Link>
  )
}

const technologies: TechLayer[] = [
  {
    layer: 'Languages',
    technologies: ['C#', 'TypeScript', 'Python', 'SQL'],
  },
  {
    layer: 'App Development',
    technologies: ['ASP.NET Core', 'Next.js', 'React', 'VSTO'],
  },
  {
    layer: 'Data & Analytics',
    technologies: [
      'Azure Synapse',
      'Databricks',
      'Power BI',
      'Azure SQL',
      'PostgreSQL',
    ],
  },
  {
    layer: 'Cloud & Delivery',
    technologies: [
      'Azure',
      'Vercel',
      'Docker',
      'Azure Pipelines',
      'GitHub Actions',
    ],
  },
  {
    layer: 'AI',
    technologies: ['Claude Code', 'GitHub Copilot', 'LLM APIs'],
  },
]

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

function Role({ role }: { role: Role }) {
  const startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  const startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  const endLabel = typeof role.end === 'string' ? role.end : role.end.label
  const endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-300 dark:ring-0">
        <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  const resume: Role[] = [
    {
      company: 'BDO USA',
      title: 'TAS Deal Analytics',
      logo: logoBdoUsa,
      start: '2021',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'Direct Supply',
      title: 'Analytics',
      logo: logoDirectSupply,
      start: '2018',
      end: '2021',
    },
  ]

  return (
    <div>
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
    </div>
  )
}

function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <CodeBracketSquareIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Featured Projects</span>
        </h2>
        <Link
          href="/projects"
          className="text-sm font-medium text-zinc-500 transition hover:text-teal-500 dark:text-zinc-400 dark:hover:text-teal-400"
        >
          See all <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      <ul
        role="list"
        className="mt-6 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2"
      >
        {projects.map((project, i) => (
          <li key={i} className="flex">
            <ProjectCard project={project} variant="plain" />
          </li>
        ))}
      </ul>
    </div>
  )
}

function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>What do you work on?</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <p>
              Software for finance — automation, internal platforms, and the
              data pipelines and analytics behind them. Specifically, I build
              tools for financial due diligence and M&amp;A, where the work has
              to hold up to scrutiny from the other side of a deal.
            </p>
            <p>
              I like owning the whole lifecycle rather than one slice of it —
              finding the problem by watching how the work actually gets done,
              building the thing, shipping it, and keeping it running.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How did you get started?</AccordionTrigger>
        <AccordionContent>
          Impatience with a manual process. My first job out of college was on a
          brand-new analytics team whose main output was a report that took
          about 40 hours to put together, most of it spent reconciling product
          names that didn&apos;t match between systems. I taught myself SQL,
          then Python, and got it down to about a minute of active time.
          I&apos;ve been writing code ever since.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Do you work on side projects?</AccordionTrigger>
        <AccordionContent>
          Yes, constantly. My chosen stack is Next.js + React, TypeScript,
          Tailwind CSS, Prisma ORM, Neon Postgres, and Vercel — with the AI SDK
          + Vercel AI Gateway for LLM features. The latest is a news agent that
          reads a dozen RSS feeds and newsletters every morning, triages them,
          and emails me a short brief. You can see the rest on my{' '}
          <Link href="/projects" className="underline underline-offset-4">
            Projects
          </Link>{' '}
          page.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4" className="border-b-0">
        <AccordionTrigger>How can I get in touch?</AccordionTrigger>
        <AccordionContent>
          The best way is to message me on{' '}
          <a
            href="https://www.linkedin.com/in/sam-spoerl/"
            target="_blank"
            className="underline underline-offset-4"
          >
            LinkedIn
          </a>
          . I&apos;m always open to connecting, so don&apos;t hesitate to reach
          out and say hello!
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default async function Home() {
  // Same key the projects page reads, filtered to the ones flagged in Edge
  // Config so which projects lead the page is a data change, not a deploy.
  // `get` returns undefined when the key is missing or EDGE_CONFIG isn't set;
  // either way the section doesn't render rather than showing an empty heading.
  const projects: Project[] | undefined = await get('projects')
  const featured = projects?.filter((project) => project.isFeatured) ?? []

  return (
    <>
      <Container className="mt-9">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:items-center lg:gap-x-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              Hi, I&apos;m Sam.
            </h1>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              I&apos;m a senior software engineer based in Washington, D.C.
              I&apos;ve been writing code since 2018, mostly automation and data
              work for finance and M&amp;A. This is my personal website, built
              to introduce myself and showcase my work.
            </p>
            <div className="mt-6 flex gap-6">
              <SocialLink
                href="https://github.com/samspoerl"
                aria-label="Follow on GitHub"
                icon={GitHubIcon}
              />
              <SocialLink
                href="https://www.linkedin.com/in/sam-spoerl/"
                aria-label="Follow on LinkedIn"
                icon={LinkedInIcon}
              />
            </div>
          </div>
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={heroImage}
                alt="Sam Spoerl"
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
        </div>
      </Container>
      <Container className="mt-20">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-12 lg:max-w-none lg:grid-cols-2 lg:gap-16">
          {featured.length > 0 && (
            <div className="space-y-10 rounded-2xl border border-zinc-100 px-6 py-6 lg:col-span-2 lg:px-10 dark:border-zinc-700/40">
              <FeaturedProjects projects={featured} />
            </div>
          )}
          <div className="space-y-10 rounded-2xl border border-zinc-100 px-6 py-6 lg:px-10 dark:border-zinc-700/40">
            <Stack layers={technologies} title="Technologies" />
          </div>
          <div className="space-y-10 rounded-2xl border border-zinc-100 px-6 py-6 lg:px-10 dark:border-zinc-700/40">
            <Resume />
          </div>
          <div className="space-y-10 rounded-2xl border border-zinc-100 px-6 pt-4 pb-6 lg:col-span-2 lg:px-10 dark:border-zinc-700/40">
            <FAQ />
          </div>
        </div>
      </Container>
    </>
  )
}
