import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  // reporter: 'html',
  reporter: [
    ['list'],
    ['html', {
      open: 'never'
    }]
  ],
  use: {
    baseURL: 'https://northwind-test-platform.vercel.app/api/v1/', 
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
});