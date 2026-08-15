function Square3Stack3DIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
    </svg>
  )
}

export interface TechLayer {
  layer: string
  technologies: string[]
}

function TechLayer({ layer }: { layer: TechLayer }) {
  return (
    <li className="flex gap-4">
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {layer.layer}
        </dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {layer.technologies.join(' | ')}
        </dd>
      </dl>
    </li>
  )
}

export function Stack({
  layers,
  title,
}: {
  layers: TechLayer[]
  title: string
}) {
  return (
    <div>
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <Square3Stack3DIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">{title}</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {layers.map((layer, i) => (
          <TechLayer key={i} layer={layer} />
        ))}
      </ol>
    </div>
  )
}
