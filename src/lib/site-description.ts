// Utility function to get dynamic years experience.
//
// Read in UTC throughout. A date-only string like '2018-09-01' parses as UTC
// midnight, so reading it back with the local-time accessors lands on Aug 31
// anywhere behind UTC — which shifted the anniversary a month early and made
// the answer depend on the runner's time zone. UTC is also the honest zone to
// count in: the pages that use this are prerendered once at build time, so
// there is no reader's local time for it to mean anything relative to.
export function getYearsExperience(): string {
  const startDate = new Date('2018-09-01')
  const currentDate = new Date()
  const startYear = startDate.getUTCFullYear()
  const currentYear = currentDate.getUTCFullYear()
  const startMonth = startDate.getUTCMonth()
  const currentMonth = currentDate.getUTCMonth()

  let yearsExperience = currentYear - startYear

  // Must decrement if a full year hasn't accrued. Comparing months alone is
  // enough only because the start date is the 1st; a mid-month start would
  // need the day compared too.
  if (currentMonth < startMonth) {
    yearsExperience--
  }

  return yearsExperience.toString()
}

/**
 * Site description used in home page and metadata description.
 */
export function getSiteDescription() {
  return `I'm a software engineer and data professional based in Washington, D.C. I've been writing code for over ${getYearsExperience()} years, and this is my personal website. I built it to introduce myself, showcase my work, and foster new connections.`
}
