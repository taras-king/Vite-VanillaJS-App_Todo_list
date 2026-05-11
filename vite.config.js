import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.js'],      // ← тільки src
    exclude: ['e2e/**', 'node_modules'],  // ← ігноруємо e2e
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.js'],
      exclude: ['src/__tests__/**'],
    },
  },
})