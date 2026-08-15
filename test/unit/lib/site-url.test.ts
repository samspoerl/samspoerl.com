import { SITE_URL, absoluteUrl } from '@/lib/site-url'
import { describe, expect, it } from 'vitest'

describe('SITE_URL', () => {
  it('is the canonical production origin', () => {
    expect(SITE_URL.origin).toBe('https://samspoerl.com')
  })

  it('is https', () => {
    expect(SITE_URL.protocol).toBe('https:')
  })
})

describe('absoluteUrl', () => {
  it.each([
    // No trailing slash on the root — matches the canonical tag Next emits.
    ['/', 'https://samspoerl.com'],
    ['/about', 'https://samspoerl.com/about'],
    ['/projects', 'https://samspoerl.com/projects'],
    ['/carve-outs', 'https://samspoerl.com/carve-outs'],
    ['/sitemap.xml', 'https://samspoerl.com/sitemap.xml'],
  ])('%s -> %s', (path, expected) => {
    expect(absoluteUrl(path)).toBe(expected)
  })

  it('does not read an env var for the origin', () => {
    // The point of the module is that the domain isn't configurable. If this
    // ever starts reading process.env, previews would canonical to themselves.
    process.env.NEXT_PUBLIC_SITE_URL = 'https://not-the-site.example'
    try {
      expect(absoluteUrl('/about')).toBe('https://samspoerl.com/about')
    } finally {
      delete process.env.NEXT_PUBLIC_SITE_URL
    }
  })
})
