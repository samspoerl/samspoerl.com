import { type Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Sam Spoerl',
    default: 'Sam Spoerl',
  },
  description:
    'Hi, I’m Sam. I’m a software developer and enthusiast based in Washington, D.C. I’ve been writing code for over five years, and this is my personal website. I built it to introduce myself, showcase my work, and foster new connections.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
