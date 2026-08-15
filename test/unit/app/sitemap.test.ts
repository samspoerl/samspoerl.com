import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { describe, expect, it } from 'vitest'

// AGENTS.md: adding a route means adding it to sitemap.ts, both nav lists in
// Header.tsx, and Footer.tsx. This pins the sitemap half of that.
const ROUTES = [
  'https://samspoerl.com',
  'https://samspoerl.com/about',
  'https://samspoerl.com/projects',
  'https://samspoerl.com/carve-outs',
]

describe('sitemap', () => {
  it('lists every route on the canonical origin', () => {
    expect(sitemap().map((entry) => entry.url)).toEqual(ROUTES)
  })

  it('emits no duplicate URLs', () => {
    const urls = sitemap().map((entry) => entry.url)
    expect(new Set(urls).size).toBe(urls.length)
  })

  it('agrees with the canonical form for the home page', () => {
    // Next strips the lone trailing slash when it emits the home canonical, so
    // the sitemap must not add one back.
    expect(sitemap()[0].url).toBe('https://samspoerl.com')
  })

  it('gives every entry a priority in range', () => {
    for (const entry of sitemap()) {
      expect(entry.priority).toBeGreaterThan(0)
      expect(entry.priority).toBeLessThanOrEqual(1)
    }
  })
})

describe('robots', () => {
  it('points at the sitemap on the canonical origin', () => {
    expect(robots().sitemap).toBe('https://samspoerl.com/sitemap.xml')
  })

  it('allows crawling', () => {
    expect(robots().rules).toEqual({ userAgent: '*', allow: '/' })
  })
})
