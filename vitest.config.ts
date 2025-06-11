import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    workspace: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/core/**/*.spec.ts', 'src/domains/**/*.spec.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          include: ['src/infra/http/**/*.spec.ts'],
          environment: 'prisma/prisma-test-environment.ts',
        },
      },
    ],
  },
})
