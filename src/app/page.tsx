import clsx from 'clsx'
import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
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
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'
import { getSiteDescription } from '@/lib/site-description'
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

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
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
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

const technologies: TechLayer[] = [
  {
    layer: 'Front-end',
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    layer: 'Backend',
    technologies: ['Express.js', 'ASP.NET Core'],
  },
  {
    layer: 'Databases',
    technologies: ['PostgreSQL', 'MongoDB', 'SQL Server'],
  },
  {
    layer: 'Languages',
    technologies: [
      'C#',
      'TypeScript',
      'Python',
      'HTML',
      'CSS',
      'SQL',
      'XAML',
      'VB',
    ],
  },
  {
    layer: 'Cloud Providers',
    technologies: ['Microsoft Azure', 'Vercel'],
  },
  {
    layer: 'Other',
    technologies: ['Docker', 'Office Add-Ins', 'Windows Apps'],
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
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-300 dark:ring-0">
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
  let resume: Role[] = [
    {
      company: 'BDO USA',
      title: 'TAS Data Analytics',
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
      {/* TODO: Potentially add later with an updated resume */}
      {/* <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button> */}
    </div>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          What technologies do you specialize in?
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <p>
              All things Microsoft: .NET (C#, VB, XAML, Web apps, Windows apps,
              Office add-ins), SQL Server, PowerShell, and Azure (cloud
              infrastructure, DevOps, Pipelines).
            </p>
            <p>
              I&apos;m also familiar with Python, although it&apos;s been a few
              years since I&apos;ve worked with it extensively.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Do you work on side projects?</AccordionTrigger>
        <AccordionContent>
          Yes, absolutely! I love working on side projects. My chosen stack is
          Next.js + React, TypeScript, Tailwind CSS, Prisma ORM, Neon Postgres,
          and Vercel. I&apos;ve worked on many different side projects that you
          can check out on my{' '}
          <Link href="/projects" className="underline underline-offset-4">
            Projects
          </Link>{' '}
          page.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          What technologies would you like to work with?
        </AccordionTrigger>
        <AccordionContent>
          I&apos;d like to continue working with .NET and Next.js + React.
          I&apos;d like to start working more with Python again, specifically
          learning one of the common backend frameworks like Django or FastAPI.
          I&apos;m also curious to learn a low-level programming language like
          C++ or Rust.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
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
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Hi, I&apos;m Sam.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {getSiteDescription()}
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
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-12 lg:max-w-none lg:grid-cols-2 lg:gap-16">
          <div className="space-y-10 rounded-2xl border border-zinc-100 px-6 py-6 lg:px-10 dark:border-zinc-700/40">
            <Stack layers={technologies} title="Technologies" />
          </div>
          <div className="space-y-10 rounded-2xl border border-zinc-100 px-6 py-6 lg:px-10 dark:border-zinc-700/40">
            <Resume />
          </div>
          <div className="space-y-10 rounded-2xl border border-zinc-100 px-6 pb-6 pt-4 lg:col-span-2 lg:px-10 dark:border-zinc-700/40">
            <FAQ />
          </div>
        </div>
      </Container>
    </>
  )
}
