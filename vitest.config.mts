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
          dir: 'src',
          exclude: ['src/http'],
        },
      },
    ],
  },
})
