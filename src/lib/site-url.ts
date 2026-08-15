/**
 * The site's canonical origin — the single place the domain is written down.
 *
 * Hardcoded rather than read from an env var on purpose. This is a
 * single-domain site, so an env var would only ever hold this value, and it
 * would need this string as its fallback anyway. More to the point, preview
 * deployments *should* point here: a preview that advertises its own
 * `*.vercel.app` origin as canonical is asking to be indexed as duplicate
 * content. Pointing every deployment at production is the behavior worth
 * having, and it's the one you get for free by not making this configurable.
 */
export const SITE_URL = new URL('https://samspoerl.com')

/**
 * Absolute URL for a site-relative path, e.g. `/about`.
 *
 * The root returns a bare origin with no trailing slash, which is what Next
 * emits for the home page's canonical tag. Keeping the sitemap in the same
 * form means the two never disagree about what the home page's URL is.
 */
export function absoluteUrl(path: string): string {
  const url = new URL(path, SITE_URL)
  return url.pathname === '/' && !url.search ? url.origin : url.href
}
