import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { getSiteDescription } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import { type Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Sam Spoerl',
    default: 'Sam Spoerl',
  },
  description: getSiteDescription(),
  keywords: ['sam spoerl', 'samspoerl', 'samuel spoerl', 'spoerl'],
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
