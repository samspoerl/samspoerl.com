// Utility function to get dynamic years experience.
export function getYearsExperience(): string {
  const startDate = new Date('2018-09-01')
  const currentDate = new Date()
  const startYear = startDate.getFullYear()
  const currentYear = currentDate.getFullYear()
  const startMonth = startDate.getMonth()
  const currentMonth = currentDate.getMonth()

  let yearsExperience = currentYear - startYear

  // Must decrement if a full year hasn't accrued.
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
