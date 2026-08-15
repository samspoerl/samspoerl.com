import { getSiteDescription, getYearsExperience } from '@/lib/site-description'
import { afterEach, describe, expect, it, vi } from 'vitest'

// The career start date the function counts from.
const START = '2018-09-01'

const ORIGINAL_TZ = process.env.TZ

/**
 * Run `fn` with the process clock and time zone both pinned.
 *
 * The time zone is the point of most of these cases, not incidental setup:
 * `getYearsExperience` reads a UTC-parsed date with local-time accessors, so
 * its answer depends on the runner's zone. CI and Vercel both run UTC — the
 * one zone where that mismatch cancels out — so a test that doesn't pin this
 * can never observe the difference.
 */
function at(instant: string, timeZone: string, fn: () => void) {
  process.env.TZ = timeZone
  vi.useFakeTimers()
  vi.setSystemTime(new Date(instant))
  try {
    fn()
  } finally {
    vi.useRealTimers()
  }
}

afterEach(() => {
  process.env.TZ = ORIGINAL_TZ
})

describe('getYearsExperience', () => {
  // Mid-August 2026 is inside the window where the answer differs by zone:
  // the anniversary hasn't come round yet, so every zone should say 7.
  describe('agrees across time zones', () => {
    const INSTANT = '2026-08-15T12:00:00Z'

    it.each([
      ['UTC'],
      ['Europe/Berlin'], // ahead of UTC
      ['Asia/Tokyo'], // well ahead of UTC
      ['America/New_York'], // behind UTC
      ['Pacific/Honolulu'], // furthest behind UTC
    ])('returns 7 in %s', (timeZone) => {
      at(INSTANT, timeZone, () => {
        expect(getYearsExperience()).toBe('7')
      })
    })
  })

  describe('counts whole years from the start date', () => {
    it.each([
      ['2026-08-31T12:00:00Z', '7', 'the day before the anniversary'],
      ['2026-09-01T12:00:00Z', '8', 'the anniversary itself'],
      ['2027-01-15T12:00:00Z', '8', 'the following January'],
      ['2019-08-31T12:00:00Z', '0', 'not quite the first year'],
      ['2019-09-01T12:00:00Z', '1', 'the first anniversary'],
    ])('%s -> %s (%s)', (instant, expected) => {
      at(instant, 'UTC', () => {
        expect(getYearsExperience()).toBe(expected)
      })
    })
  })

  it(`counts from ${START}`, () => {
    // Guards the start date itself: if it moves, these expectations are the
    // thing that should have moved with it.
    at('2026-09-01T12:00:00Z', 'UTC', () => {
      expect(getYearsExperience()).toBe('8')
    })
    at('2026-08-31T12:00:00Z', 'UTC', () => {
      expect(getYearsExperience()).toBe('7')
    })
  })
})

describe('getSiteDescription', () => {
  it('interpolates the current years of experience', () => {
    at('2026-08-15T12:00:00Z', 'UTC', () => {
      expect(getSiteDescription()).toContain('over 7 years')
    })
  })

  it('tracks getYearsExperience rather than hardcoding a count', () => {
    at('2030-10-01T12:00:00Z', 'UTC', () => {
      expect(getSiteDescription()).toContain(`over ${getYearsExperience()} `)
      expect(getSiteDescription()).toContain('over 12 years')
    })
  })
})
