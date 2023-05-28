import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',

	// timeout: 10 * 2000,

	// expect: { timeout: 5000 },

	/* Run tests in files in parallel */
	fullyParallel: false,

	reporter: 'html',
	use: {
		baseURL: 'http://127.0.0.1:3000',

		trace: 'retain-on-failure',

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
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				ignoreHTTPSErrors: true,
			},
		},
	],

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://127.0.0.1:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
});
