import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    // Mirrors the `@/*` path in tsconfig.json. Set by hand rather than via
    // vite-tsconfig-paths — there is exactly one alias, and a dependency to
    // read it back out of tsconfig costs more than it saves.
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
  },
})
