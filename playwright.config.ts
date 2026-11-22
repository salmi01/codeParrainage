import { defineConfig } from "@playwright/test";

const port = Number(process.env.QA_PORT || 3109);
export default defineConfig({
  testDir: "./tests/browser",
  workers: 1,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    channel: process.env.BROWSER_CHANNEL || "chrome",
    viewport: { width: 1440, height: 960 },
  },
  webServer: { command: `npm run start -- --hostname 127.0.0.1 --port ${port}`, url: `http://127.0.0.1:${port}`, reuseExistingServer: false },
});
