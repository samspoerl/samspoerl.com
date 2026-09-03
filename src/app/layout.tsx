import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { SITE_URL } from '@/lib/site-url'
import { Analytics } from '@vercel/analytics/react'
import { type Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  // Without this, Next resolves og:image against VERCEL_PROJECT_PRODUCTION_URL
  // in production and localhost in a local build — right by accident on the
  // deployed site, wrong everywhere else.
  metadataBase: SITE_URL,
  title: {
    template: '%s - Sam Spoerl',
    default: 'Sam Spoerl',
  },
  description:
    'Senior software engineer in Washington, D.C. I build automation, data pipelines, and internal platforms for finance and M&A workflows, plus side projects.',
  keywords: ['sam spoerl', 'samspoerl', 'samuel spoerl', 'spoerl'],
  alternates: {
    // './' resolves against the current route's pathname, so this one
    // declaration gives every page its own canonical rather than pointing them
    // all at the home page. A preview deployment canonicals to production.
    canonical: './',
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
