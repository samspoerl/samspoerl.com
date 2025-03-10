export type ProjectStatus = 'Ideation' | 'Dev' | 'Preview' | 'Prod'

interface StatusTrackerProps {
  currentStatus: ProjectStatus
}

export function StatusTracker({
  currentStatus = 'Ideation',
}: StatusTrackerProps) {
  const statuses: ProjectStatus[] = ['Ideation', 'Dev', 'Preview', 'Prod']

  // Find the index of the current status
  const currentIndex = statuses.indexOf(currentStatus)

  return (
    <div className="mb-6 flex max-w-md flex-col gap-1 p-4">
      <div className="relative flex flex-row items-center justify-between">
        {/* Base track line - positioned to go through dot centers */}
        <div className="absolute left-0 right-0 h-0.5 bg-zinc-500"></div>

        {/* Progress line - positioned to go through dot centers */}
        <div
          className={`absolute left-0 h-1 bg-teal-500`}
          style={{
            width:
              currentIndex === 0
                ? '0%'
                : `${(currentIndex / (statuses.length - 1)) * 100}%`,
          }}
        ></div>

        {/* Status dots */}
        {statuses.map((status, index) => {
          const isActive = index <= currentIndex
          const isCurrentStatus = index === currentIndex

          return (
            <div
              key={status}
              className="relative flex items-center justify-center"
            >
              <div
                className={`z-0 h-4 w-4 rounded-full ${isActive ? 'bg-teal-400 dark:bg-teal-500' : 'bg-zinc-500'} ${isCurrentStatus ? 'ring-2 ring-teal-200' : ''}`}
              ></div>
              <p
                className={`absolute top-5 text-sm ${isActive ? 'text-zinc-950 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'}`}
              >
                {status}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
