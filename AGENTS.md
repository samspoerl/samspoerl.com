<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# samspoerl.com

Sam Spoerl's personal website — a four-page portfolio and about site: home, `/about`, `/projects`, `/carve-outs`. It started from the Tailwind Plus "Spotlight" template and has been edited in place since, so much of the code is template code with local changes on top rather than something written from scratch.

There is no database, no auth, no API, and no user-supplied input. Every page is a Server Component that renders content the repo already knows, except the projects list, which is fetched from Vercel Edge Config. Client components exist only for the things that genuinely need a browser: theme toggling, the mobile nav popover, the FAQ accordion, and the header's scroll-driven avatar.

That shape is the main thing to keep in mind when changing it. Reach for a client component, a fetch, or a state library only when the page can't answer the question at render time — so far, none of them can't.

**This file describes the project's current state, not how it got here.** Why something changed, what it replaced, and what bug prompted it belong in the commit and the PR that made the change. Repeating them here makes this file grow with every change and go stale with each one.

## Stack

- **Framework:** Next.js 16 (App Router) with React 19 — no React Compiler, `next.config.ts` is empty
- **Language:** TypeScript (strict), `@/*` → `./src/*`
- **Package manager:** pnpm (`pnpm-lock.yaml`), pinned via `packageManager` in `package.json`
- **Styling:** Tailwind CSS v4; dark mode via `next-themes` on the `class` strategy
- **Behavior primitives:** Headless UI (the mobile nav `Popover`) and Radix (`@radix-ui/react-accordion`, wrapped shadcn-style)
- **Icons:** lucide-react, plus hand-inlined SVGs from the template
- **Class merging:** `clsx` and `tailwind-merge`
- **Hosting/platform:** Vercel — `@vercel/analytics` for pageviews, `@vercel/edge-config` for the projects list
- **Images:** `next/image` with `sharp`

### pnpm, and where its settings live

`pnpm-workspace.yaml` at the root is **not** a monorepo declaration — it has no `packages` key and this is a single package. It's there because pnpm 11 no longer reads its settings from a `"pnpm"` key in `package.json`; that file is the only place they're honored now.

The one setting it holds is `allowBuilds`. pnpm refuses to run a dependency's install scripts unless it's listed there, so a package that links a native binary during install silently doesn't, and fails later at a confusing distance from the cause. Today that's `unrs-resolver` (pulled in by `eslint-config-next`). If an install prints `ERR_PNPM_IGNORED_BUILDS`, the fix is to add the named package there — after checking it actually needs a build script — rather than to run `pnpm approve-builds`, which writes the same file but leaves the reasoning out of the diff.

### Vercel needs Corepack turned on, and that setting isn't in this repo

Vercel detects _pnpm_ from `pnpm-lock.yaml`, but it does **not** read `packageManager` by default — it infers a version from `lockfileVersion`, and `9.0` maps to "pnpm 9 or 10, older projects prefer 9." This project is old enough to get 9, and its native support stops at 10, so no amount of pinning in `package.json` reaches pnpm 11 on its own.

The bridge is Corepack, enabled by an environment variable on the Vercel project itself: `ENABLE_EXPERIMENTAL_COREPACK=1`. With it, Vercel honors `packageManager` and local and CI run the same pnpm. Without it, the build fails at install with `ERROR packages field missing or empty` — pnpm 9 reading `pnpm-workspace.yaml` as a real workspace declaration and finding no `packages` key. That error names the wrong thing; adding a `packages` key is not the fix.

This is the one piece of the build that lives outside the repo, so nothing here will tell you it's missing. If a fresh Vercel project (or a fork) fails on install with that error, this is why. It has to be set in the dashboard or via `vercel env add` — `vercel.json` can't carry it.

### Tailwind v4, configured the v3 way

The v4 upgrade kept the JavaScript config instead of moving to CSS-first `@theme`. `src/app/globals.css` imports Tailwind and then bridges to it:

```css
@import 'tailwindcss';
@config '../../tailwind.config.ts';
```

So `tailwind.config.ts` is still the place to change the font scale or the accordion keyframes — not `@theme` blocks in CSS. `globals.css` also carries the v4 compatibility shim that keeps the default border color at gray-200 rather than `currentColor`. Both of those are deliberate; if you move to CSS-first config, move all of it at once rather than leaving two sources of truth.

## Project Structure

```
src/
  app/                   # App Router — one directory per route, all Server Components
    layout.tsx           # <html>/<body>, site metadata, Providers, Layout, Analytics
    providers.tsx        # 'use client' — ThemeProvider + system-theme watcher
    page.tsx             # Home: intro, photo strip, tech stack, work history, FAQ
    about/page.tsx
    carve-outs/page.tsx
    projects/
      page.tsx           # Reads the project list from Edge Config
    globals.css
    icon.tsx             # Favicon, generated via next/og ImageResponse
    apple-icon.tsx
    opengraph-image.jpg
    robots.ts, sitemap.ts, not-found.tsx
  components/            # Flat, shared across routes — see Components
    ProjectCard.tsx      # Rendered by /projects and the home page
    shadcn/              # Generated shadcn wrappers over Radix
  images/                # Imported statically by next/image
  lib/
    utils.ts             # cn()
    formatDate.ts        # Template leftover, currently unused
tailwind.config.ts       # Tailwind v4 config, bridged from globals.css via @config
.github/
  dependabot.yml
  workflows/ci.yml                      # format, typecheck, lint — see Tests
  workflows/dependabot-auto-merge.yml
```

### Where content lives

Almost all of it is hardcoded JSX in the page that renders it — the work history and the FAQ in `app/page.tsx`, the essay in `app/about/page.tsx`, the recommendations in `app/carve-outs/page.tsx`. That's the right default for a site this size: the content is prose with links and emphasis in it, so a data file would just be JSX in a less convenient place. Edit the page.

One exception:

- **Projects** come from **Vercel Edge Config** (`get('projects')` in `app/projects/page.tsx`, typed as `Project[]` in `components/ProjectCard.tsx`). They live outside the repo so the list can be updated without a deploy. `get` returns `undefined` when the key is missing or `EDGE_CONFIG` isn't set, and the page renders an empty grid rather than failing — keep that. If you change the `Project` shape, the Edge Config value has to change with it; nothing validates the two against each other at build time. `isFeatured` is set there too: the home page renders the projects carrying it, so which ones lead the site is a data change rather than a deploy. Nothing is featured until something is flagged, and the section is hidden entirely when nothing is.

`sitemap.ts` lists the four routes by hand. Adding a route means adding it there and to both nav lists in `Header.tsx` (desktop and mobile) and the list in `Footer.tsx`.

### Environment variables

- `EDGE_CONFIG` — connection string for the projects list. Without it, `/projects` renders empty. This is the only one.

The site's own domain is deliberately **not** an env var. It lives in `lib/site-url.ts` as `SITE_URL`, which feeds `metadataBase` and the canonical tag in the root layout, plus `sitemap.ts` and `robots.ts` via `absoluteUrl()`. Making it configurable would mean a preview deployment advertising its own `*.vercel.app` origin as canonical, which invites duplicate-content indexing; every deployment pointing at production is the behavior worth having. Change the domain in that one file.

## Components

Three places a component can go, and the choice is about who renders it, not how reusable it feels:

- **`src/components/`** — flat, no subdirectories, for anything rendered by more than one route: `Container`, `Layout`, `Header`, `Footer`, `Card`, `Button`, `Section`, `SimpleLayout`, `SocialIcons`, `Stack`, `StatusTracker`. Most of these came from the template. It's flat because there are a dozen of them; if it grows past the point where you can scan the directory listing, group it then, not in anticipation.
- **`src/components/shadcn/`** — components generated by the shadcn CLI, kept separate because they're vendored code with a known upstream, not hand-written. `accordion.tsx` is the only one. Don't restyle these into something the generator wouldn't produce; if the accordion needs to look different, pass classes at the call site.
- **`src/app/<route>/ui/`** — components only one route renders. This is the default for anything new, and there are none at the moment: `ProjectCard` started here and moved up when the home page became its second caller. A component earns that promotion on the second real caller in a different route, not before.

Beyond that, the rules the existing code already follows:

- **Prefer plain markup to a wrapper.** A component that returns one styled element earns nothing. The template's own bespoke bits — `BriefcaseIcon`, `SocialLink`, `Role`, `FAQ` in `app/page.tsx` — are defined in the file that uses them, and that's correct. Keep it that way; if you can't point at the line producing a visual result in the file you're reading, it's too abstracted.
- **Compound components over prop explosions** where the template already does it. `Card` exposes `Card.Link`, `Card.Title`, `Card.Description`, `Card.Cta`, `Card.Eyebrow`; follow that shape when extending it rather than adding a `variant` prop.
- **Variation goes in props, not sibling files.** `Button` has `variant`; a second button component is the wrong answer.
- **These are hand-built designs, not a design system.** Reach for the markup the screen actually needs.

### Where `'use client'` goes

At the lowest component that owns mutable state or touches a browser API — never higher. Today that's exactly four files: `providers.tsx` (theme context), `Header.tsx` (theme toggle, mobile popover, scroll listener), `shadcn/accordion.tsx`, and nothing else. Every page and every other component is a Server Component.

Nothing fetches on the client, and there's no reason for it to start: the only remote read is Edge Config, which is fast and happens during the server render. If a client-side read ever becomes necessary, that's a design change worth stating a reason for, not a default to slide into.

### Reaching for a behavior library

Use Headless UI or Radix when a widget has **correctness you can't see** — dismissal, focus return, focus trapping, viewport-edge positioning, ARIA wiring. That's a narrower bar than "is interactive": the theme toggle is a plain `<button onClick>` with an `aria-label`, and that's right, because it has no invisible half.

The reason the line sits there: a panel with the right Tailwind classes looks finished in a screenshot whether or not Escape closes it. Styling gets caught by looking at it; this doesn't.

Both libraries ship unstyled, so they cost nothing in traceability — every class that renders a pixel is still on the part, in the file you're reading. Note that this repo uses two of them for historical reasons (Headless UI came with the template, Radix came with shadcn). Don't add a third, and prefer the one already present for a given kind of widget.

### Unused template leftovers

`lib/formatDate.ts` has no callers — it's what's left of the template's blog/articles section, which this site doesn't have. Fine to delete if you're touching that area; don't build on it expecting it to be load-bearing.

## Tests

**Unit tests only, via Vitest** — `pnpm test` (and `pnpm test:watch`), configured in `vitest.config.mts` in a node environment. There is no component or E2E setup yet, so don't write tests against infrastructure that doesn't exist, and don't claim a change is "tested" because `next build` succeeded.

`.github/workflows/ci.yml` runs on every PR and on pushes to main. `pnpm check` runs the same four checks locally — `format:check`, `typecheck`, `test`, `lint` — so a green local run means a green CI run. Two things about it are worth knowing before you edit it:

- **The `format` job is separate only to scope `contents: write`.** On a PR that isn't Dependabot's it runs `pnpm format` and pushes the fix rather than failing, since a red X over a quote style costs a round trip and nothing else. A push made with `GITHUB_TOKEN` starts no further workflow run, so the checks on a PR stay attached to the commit that was reviewed. Everything else stays read-only, which is the point of the split.
- **`checks` runs `next typegen` before `tsc`.** `next-env.d.ts` is gitignored and only written by `next dev` / `next build`, and it carries the module declarations for the `@/images/*` static imports — without it `tsc` fails with nine `TS2307`s that have nothing to do with the change under review. The `format` job deliberately doesn't need this step; prettier's output is byte-identical with and without the generated types.

Tests run in the `checks` job, between typecheck and lint. The split is by **what a test needs in order to run**, since that's what decides its config, its command, and its CI job:

- **Unit** — pure functions, which today means `lib/site-url.ts`, `app/sitemap.ts`, and anything that joins them. No mocks, no request context, no network.
- **Component/E2E** — not set up. The site's actual risk is visual and navigational: the header's scroll math, the theme toggle surviving hydration, the four routes rendering. That's Playwright territory rather than jsdom, and the Playwright MCP server is already configured in `.mcp.json`.

Specs should mirror the `src/` path of what they cover — `src/lib/site-url.ts` → `test/unit/lib/site-url.test.ts`.

The presentational components stay out of unit tests: testing them means mocking more than they contain.

## Code Style

- **Prettier:** `semi: false`, `singleQuote: true`, `printWidth: 80`, `trailingComma: 'es5'`; `tailwindFunctions: ['clsx', 'tw']`; imports auto-organized via `prettier-plugin-organize-imports`, classes sorted via `prettier-plugin-tailwindcss`
- **Lint:** `pnpm lint` — flat config extending `eslint-config-next` (core-web-vitals + typescript) with `eslint-config-prettier` last
- **Imports:** the `@/*` alias, not relative paths that climb out of a directory
- **Class merging:** `cn()` from `@/lib/utils` when classes come from props and could conflict; plain `clsx` when they're just being composed. Both are in use and both are correct — `cn()` is `twMerge(clsx(...))`, so use it where a later class needs to actually win.
- **`let` vs `const`:** the template's components declare locals with `let` (`let Component = as ?? 'div'`). Newer code here uses `const`. Match the file you're editing rather than converting one to the other in passing; a whitespace-scale diff across template files buries the change you actually made.

### Comments

**Medium verbosity.** Comment where something is non-obvious or where an explicit decision was made — a constraint that looks removable but isn't, an ordering that matters, a shape chosen over the more natural one. A sentence or two, not a paragraph.

Don't narrate what the code already says, and don't restate the reasoning in this file at every call site — the long explanations belong here, where they're read once, and a comment can point at them instead.

## Git Conventions

Use **Conventional Commits** (<https://www.conventionalcommits.org>) for all commits, branch names, and PR titles.

**Commit messages** — `<type>(<scope>): <description>`

- Common types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `ci`
- Scope is optional but recommended (e.g. `home`, `projects`, `nav`, `ui`, `deps`)
- Examples: `feat(projects): add status tracker to project cards`, `fix(nav): correct mobile menu spacing`
- Use `BREAKING CHANGE:` footer and append `!` after the type/scope for breaking changes
- ALWAYS output commit messages in a code fence when asked for one

**Branch names** — `<type>/<issue-id>-<short-description>`

- Examples: `feat/12-add-status-tracker`, `fix/34-header-mobile-spacing`, `chore/tailwind-v4`
- The `README.md` advertises `user/[github-username]/[description]` — that's for outside contributors, not for work done in this repo by its owner.

**PR titles** — same format as a commit subject: `<type>(<scope>): <description>`

**PR descriptions, issues, and comments** — never hard-wrap. One paragraph or bullet is one line, however long.

- GitHub soft-wraps prose to the reader's width, so a hard wrap doesn't change what renders — it only breaks the source a human reads and edits, and re-flows into a ragged mess the moment a sentence is changed.
- This is the opposite of the commit-message convention above, and deliberately so: a commit message is read by `git log` in a terminal that won't wrap it for you. Wrap those, not these.

**Dependabot** opens the majority of PRs here, and `.github/workflows/dependabot-auto-merge.yml` merges them on a daily schedule. A PR has to clear three gates: no major or breaking bump (a `0.x` minor counts as breaking), every job of the `CI` workflow green, and a Vercel Preview deployment reporting `success`. Major bumps are left open on purpose and are yours to review. Don't hand-merge a Dependabot PR that hasn't gone green just because the diff looks small.

Three things about that script are load-bearing and easy to undo by accident:

- **Version pairs are read from the PR body, not the title.** A grouped update (the `react` and `next` groups in `dependabot.yml`) titles itself "bump the next group with 2 updates" and states no versions at all, so title parsing skipped those PRs entirely. The body carries one `Bumps`/`Updates ... from A to B` line per member. The match is anchored to the line start so version strings inside the embedded release notes aren't read as bumps, and any line that looks like a bump but won't parse makes the whole PR skip — a silent "no bumps found" must never read as "no major bumps found."
- **"No CI runs at all" is a distinct verdict from "all CI runs green."** A PR with no CI attached satisfies an all-green rule vacuously, so it gets its own `NO_CI` state and is left open. This is not hypothetical: any Dependabot PR opened before `ci.yml` landed has an empty rollup until Dependabot rebases it.
- **The job needs `actions: read`**, on top of the `checks` and `statuses` scopes. `gh` resolves a check run's `workflowName` through `checkSuite.workflowRun`, which sits behind that scope. Without it the rollup comes back as partial data plus per-node "Resource not accessible by integration" errors, `gh` treats that as a hard failure, and no PR ever reaches a verdict — the workflow fails open-ended rather than loudly.

Check runs are collapsed to the newest per name before judging, since a re-run adds a second entry under the same name and the stale one must not win. `workflow_dispatch` takes a `dry_run` input defaulting to `true`, which is the way to test a change to any of this: it prints the verdict table to the step summary and merges nothing.

## GitHub Issue Conventions

Issue titles use **Sentence case**, not Conventional Commits — labels carry type/domain/severity instead. Labels are filterable and groupable in the GitHub UI (issue list, Projects, milestones) in a way a title prefix isn't, and a title only ever describes one thing while an issue can span several domains. GitHub's native Issue Type field (Bug/Feature/Task) is intentionally unused — it's an org-only feature that doesn't exist on personal repos, so it can't be relied on for consistency across both.

- **Title:** plain sentence case, no prefix — e.g. `Wire NEXT_PUBLIC_SITE_URL into canonical metadata`
- **Labels:** exactly one type label, zero or more domain labels, and — for bugs — one `severity: *` label if the severity is known

**Type labels** — singular nouns naming what the issue _is_ (the PR that resolves it uses the verb form as its Conventional Commit type): `bug` (→ `fix`), `feature` (→ `feat`), `chore`, `documentation` (→ `docs`), `refactor`, `test`, `performance` (→ `perf`), `ci`

**Domain labels** — which part of the site the issue concerns, e.g. `home`, `about`, `projects`, `carve-outs`, `nav`, `theme`, `seo`, `content`, `ui`, `deps`. Free-form and created as needed, same as commit scopes — apply as many as genuinely apply, since a single title prefix can't capture an issue that spans domains.

**Severity labels** (bugs only): `severity: critical`, `severity: high`, `severity: medium`, `severity: low`

> **Current state:** the repo still has GitHub's stock label set. Of the above, only `bug`, `documentation`, and `dependencies` exist; `enhancement` is present where this convention wants `feature`, and no domain or severity labels exist yet. Create labels as you need them rather than falling back to the stock ones, and don't assume a label exists because it's listed here.

When opening a PR for an issue, translate the issue's type and domain labels into the Conventional Commit PR title — an issue labeled `bug` + `nav` becomes PR title `fix(nav): ...`. The branch name takes the same type plus the issue number, per Branch names above: `fix/42-...`.
