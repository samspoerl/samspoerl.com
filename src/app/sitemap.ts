import { absoluteUrl } from '@/lib/site-url'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: absoluteUrl('/'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: absoluteUrl('/about'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: absoluteUrl('/projects'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/carve-outs'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.2,
    },
  ]
}
