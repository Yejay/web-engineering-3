import { defineConfig, devices } from '@playwright/test';
import { PlaywrightTestConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

const config: PlaywrightTestConfig = defineConfig({
	testDir: './tests',

	/* Run tests in files in parallel */
	fullyParallel: false,

	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,

	/* Retry on CI only */
	retries: process.env.CI ? 1 : 1,

	/* Opt out of parallel tests on CI. */
	workers: 1,

	reporter: process.env.CI ? 'dot' : 'list',
	use: {
		trace: 'on',
		headless: true,
		ignoreHTTPSErrors: true,
		launchOptions: {
			args: [
				'--disable-web-security',
				'--ignore-certificate-errors',
				'--ignore-certificate-errors-spki-list',
				'--allow-insecure-localhost',
				// '--allow-running-insecure-content',
				// '--unsafely-treat-insecure-origin-as-secure=http://localhost:3000',
			],
		},
	},

	projects: [
		{
			name: 'firefox',
			use: devices['Desktop Firefox'],
		},
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				ignoreHTTPSErrors: true,
			},
		},
	],

	// Use this to automatically start a web server for tests.
	/* Run your local dev server before starting the tests */
	// webServer: {
	// 	command: 'npm run start',
	// 	port: 3000,
	// 	reuseExistingServer: !process.env.CI,
	// 	timeout: 120 * 1000,
	// },
});

export default config;
