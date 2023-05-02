import { test, expect } from '@playwright/test';

async function loginUser(page, userID, password) {
	await page.goto('http://localhost:3000/');
	await page.locator('#OpenLoginDialogButton').click();
	await page.getByPlaceholder('Enter user ID').click();
	await page.getByPlaceholder('Enter user ID').fill(userID);
	await page.getByPlaceholder('Password').click();
	await page.getByPlaceholder('Password').fill(password);
	await page.locator('#PerformLoginButton').click();
}

async function createUser(page, userID, firstName, lastName, password) {
	await page.locator('#OpenUserManagementPageButton').click();
	await page.locator('#UserManagementPageCreateUserButton').click();
	await page.locator('#CreateUserComponentEditUserID').click();
	await page.locator('#CreateUserComponentEditUserID').fill(userID);
	await page.locator('#CreateUserComponentEditFirstName').click();
	await page.locator('#CreateUserComponentEditFirstName').fill(firstName);
	await page.locator('#CreateUserComponentEditLastName').click();
	await page.locator('#CreateUserComponentEditLastName').fill(lastName);
	await page.locator('#CreateUserComponentEditPassword').click();
	await page.locator('#CreateUserComponentEditPassword').fill(password);
	await page.locator('#CreateUserComponentCreateUserButton').click();
}

test('login-as-admin', async ({ page }) => {
	await loginUser(page, 'admin', '123');
	await expect(page.locator('#LogoutButton')).toBeVisible();
});

test('create-and-login-as-new-user', async ({ page }) => {
	await loginUser(page, 'admin', '123');
	await expect(page.locator('#LogoutButton')).toBeVisible();
	await createUser(page, 'yejay', 'Yejay', 'Demirkan', '123');
	await expect(page.locator('#UserItemyejay')).toBeVisible();
	await page.locator('#LogoutButton').click();
	await expect(page.locator('#OpenLoginDialogButton')).toBeVisible();
	await loginUser(page, 'yejay', '123');
	await expect(page.locator('#LogoutButton')).toBeVisible();
});

test('login-as-nonexistent-user', async ({ page }) => {
	await loginUser(page, 'fail', '123');
	await expect(page.locator('#LogoutButton')).not.toBeVisible();
});

test('logout-test', async ({ page }) => {
	await loginUser(page, 'admin', '123');
	await expect(page.locator('#LogoutButton')).toBeVisible();
	await page.locator('#LogoutButton').click();
	await expect(page.locator('#OpenLoginDialogButton')).toBeVisible();
});

test('visibility-navbar-elements-admin', async ({ page }) => {
	await loginUser(page, 'admin', '123');
	await expect(page.locator('#OpenUserManagementPageButton')).toBeVisible();
	await expect(page.locator('#OpenDegreeCourseManagementPageButton')).toBeVisible();
	await expect(page.locator('#OpenDegreeCourseApplicationManagementPageButton')).toBeVisible();
	await page.locator('#OpenDegreeCourseManagementPageButton').click();
	await expect(page.locator('#DegreeCourseManagementPageCreateDegreeCourseButton')).toBeVisible();
	await expect(page.locator('#LogoutButton')).toBeVisible();
	await page.locator('#LogoutButton').click();
	await expect(page.locator('#OpenLoginDialogButton')).toBeVisible();
});

// sometimes fails for some reason
test('visibility-navbar-elements-user', async ({ page }) => {
	await loginUser(page, 'yejay', '123');
	await expect(page.locator('#OpenUserManagementPageButton')).not.toBeVisible();
	await expect(page.locator('#OpenDegreeCourseManagementPageButton')).toBeVisible();
	await expect(page.locator('#OpenDegreeCourseApplicationManagementPageButton')).toBeVisible();
	await expect(page.locator('#LogoutButton')).toBeVisible();
	await page.locator('#LogoutButton').click();
	await expect(page.locator('#OpenLoginDialogButton')).toBeVisible();
});
