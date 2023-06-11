import { test, expect } from '@playwright/test';

async function loginUser(page, userID, password) {
	await page.goto('http://localhost:3000/');
	await page.locator('#OpenLoginDialogButton').click();
	await page.fill('[placeholder="Enter user ID"]', userID);
	await page.fill('[placeholder="Password"]', password);
	await page.locator('#PerformLoginButton').click();
}

async function createUser(page, userID, firstName, lastName, password) {
	await page.locator('#OpenUserManagementPageButton').click();
	await page.locator('#UserManagementPageCreateUserButton').click();
	await page.fill('#CreateUserComponentEditUserID', userID);
	await page.fill('#CreateUserComponentEditFirstName', firstName);
	await page.fill('#CreateUserComponentEditLastName', lastName);
	await page.fill('#CreateUserComponentEditPassword', password);
	await page.locator('#CreateUserComponentCreateUserButton').click();
}

async function createDegreeCourse(page, universityName, universityShortName, departmentName, departmentShortName, degreeCourseName, degreeCourseShortName) {
	await page.locator('#OpenDegreeCourseManagementPageButton').click();
	await page.locator('#DegreeCourseManagementPageCreateDegreeCourseButton').click();
	await page.fill('#CreateDegreeCourseComponentEditUniversityName', universityName);
	await page.fill('#CreateDegreeCourseComponentEditUniversityShortName', universityShortName);
	await page.fill('#CreateDegreeCourseComponentEditDepartmentName', departmentName);
	await page.fill('#CreateDegreeCourseComponentEditDepartmentShortName', departmentShortName);
	await page.fill('#CreateDegreeCourseComponentEditName', degreeCourseName);
	await page.fill('#CreateDegreeCourseComponentEditShortName', degreeCourseShortName);
	await page.locator('#CreateDegreeCourseComponentCreateDegreeCourseButton').click();
}

test('check for LandingPage div', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	// Wait for the StartPage div to be visible
	await page.waitForSelector('#LandingPage', { timeout: 5000 });

	// If the div is found, the test will pass. If the div is not found within the timeout period, the test will fail.
});

test('check for StartPage div', async ({ page }) => {
	await loginUser(page, 'admin', '123');

	// Wait for the StartPage div to be visible
	await page.waitForSelector('#StartPage', { timeout: 5000 });

	// If the div is found, the test will pass. If the div is not found within the timeout period, the test will fail.
});

test('login-as-admin', async ({ page }) => {
	await loginUser(page, 'admin', '123');
	await expect(page.locator('#LogoutButton')).toBeVisible();
});

// test('create-and-login-as-new-user', async ({ page }) => {
// 	await loginUser(page, 'admin', '123');
// 	await expect(page.locator('#LogoutButton')).toBeVisible();
// 	await createUser(page, 'yejay', 'Yejay', 'Demirkan', '123');
// 	await expect(page.locator('#UserItemyejay')).toBeVisible();
// 	await page.locator('#LogoutButton').click();
// 	await expect(page.locator('#OpenLoginDialogButton')).toBeVisible();
// 	await loginUser(page, 'yejay', '123');
// 	await expect(page.locator('#LogoutButton')).toBeVisible();
// });

// test('login-as-nonexistent-user', async ({ page }) => {
// 	await loginUser(page, 'fail', '123');
// 	await expect(page.locator('#LogoutButton')).not.toBeVisible();
// });

// test('logout-test', async ({ page }) => {
// 	await loginUser(page, 'admin', '123');
// 	await expect(page.locator('#LogoutButton')).toBeVisible();
// 	await page.locator('#LogoutButton').click();
// 	await expect(page.locator('#OpenLoginDialogButton')).toBeVisible();
// });

// test('visibility-navbar-elements-admin', async ({ page }) => {
// 	await loginUser(page, 'admin', '123');
// 	await expect(page.locator('#OpenUserManagementPageButton')).toBeVisible();
// 	await expect(page.locator('#OpenDegreeCourseManagementPageButton')).toBeVisible();
// 	await expect(page.locator('#OpenDegreeCourseApplicationManagementPageButton')).toBeVisible();
// 	await page.locator('#OpenDegreeCourseManagementPageButton').click();
// 	await expect(page.locator('#DegreeCourseManagementPageCreateDegreeCourseButton')).toBeVisible();
// 	await expect(page.locator('#LogoutButton')).toBeVisible();
// 	await page.locator('#LogoutButton').click();
// 	await expect(page.locator('#OpenLoginDialogButton')).toBeVisible();
// });

// test('visibility-navbar-elements-user', async ({ page }) => {
// 	await loginUser(page, 'yejay', '123');
// 	await page.waitForSelector('#OpenDegreeCourseManagementPageButton');
// 	await expect(page.locator('#OpenUserManagementPageButton')).not.toBeVisible();
// 	await expect(page.locator('#OpenDegreeCourseManagementPageButton')).toBeVisible();
// 	await expect(page.locator('#OpenDegreeCourseApplicationManagementPageButton')).toBeVisible();
// 	await expect(page.locator('#LogoutButton')).toBeVisible();
// 	await page.locator('#LogoutButton').click();
// 	await expect(page.locator('#OpenLoginDialogButton')).toBeVisible();
// });

// test('create-user', async ({ page }) => {
// 	await loginUser(page, 'admin', '123');
// 	await createUser(page, 'yejay', 'Yejay', 'Demirkan', '123');
// 	const userCard = page.locator('#UserItemyejay');
// 	await expect(userCard).toBeVisible();
// });

// test('edit-user', async ({ page }) => {
// 	const newFirstName = 'koray';
// 	await loginUser(page, 'admin', '123');
// 	await createUser(page, 'yejay', 'Yejay', 'Demirkan', '123');
// 	await page.locator('#UserItemEditButtonyejay').click();
// 	const userIDField = page.locator('#EditUserComponentEditUserID');
// 	await expect(userIDField).toBeDisabled();
// 	await page.locator('#EditUserComponentEditFirstName').click();
// 	await page.locator('#EditUserComponentEditFirstName').fill(newFirstName);
// 	await page.locator('#EditUserComponentSaveUserButton').click();
// 	const userCard = page.locator(`#UserItemyejay`);
// 	await expect(userCard).toBeVisible();
// 	const firstNameField = page.locator(`#UserItemyejay #FirstName`);
// 	await expect(firstNameField).toHaveText('First Name: koray');
// });

// test('delete-user', async ({ page }) => {
// 	await loginUser(page, 'admin', '123');
// 	await createUser(page, 'yejay', 'Yejay', 'Demirkan', '123');
// 	await page.locator(`#UserItemDeleteButtonyejay`).click();
// 	const modal = page.locator('.modal-content');
// 	await expect(modal).toBeVisible();
// 	await page.locator('#DeleteDialogConfirmButton').click();
// 	const userCard = page.locator(`#UserItemyejay`);
// 	await expect(userCard).not.toBeVisible();
// });

// test('create-degree-course', async ({ page }) => {
// 	await loginUser(page, 'admin', '123');
// 	await createUser(page, 'yejay', 'Yejay', 'Demirkan', '123');
// 	await createDegreeCourse(page, 'BHT Berlin', 'BHT', 'Fachbereich 6', 'F-VI', 'Medieninformatik Bachelor', 'MIB');
// 	const degreeCourseName = 'Medieninformatik Bachelor';
// 	await expect(page.locator(`text=${degreeCourseName}`)).toBeVisible();
// });

// test('create-degree-course-v2', async ({ page }) => {
// 	await loginUser(page, 'admin', '123');
// 	await createDegreeCourse(page, 'BHT Berlin', 'BHT', 'Fachbereich 6', 'F-VI', 'Medieninformatik Bachelor', 'MIB');
// 	const degreeCourseCard = page.locator('.degree-cards:has-text("Medieninformatik Bachelor")');
// 	await expect(degreeCourseCard).toBeVisible();
// });

// test('edit-degree-course', async ({ page }) => {
// 	const newShortName = 'Beuth';
// 	await loginUser(page, 'admin', '123');
// 	await createDegreeCourse(page, 'BHT Berlin', 'BHT', 'Fachbereich 6', 'F-VI', 'Medieninformatik Bachelor', 'MIB');
// 	await page.locator('#DegreeCourseItemEditButton' + 'MIB').click();
// 	await expect(page.locator('.modal-content')).toBeVisible();
// 	await expect(page.locator('#EditDegreeCourseComponentEditName')).toHaveValue('Medieninformatik Bachelor');
// 	await expect(page.locator('#EditDegreeCourseComponentEditShortName')).toHaveValue('MIB');
// 	await expect(page.locator('#EditDegreeCourseComponentEditUniversityName')).toHaveValue('BHT Berlin');
// 	await expect(page.locator('#EditDegreeCourseComponentEditUniversityShortName')).toHaveValue('BHT');
// 	await expect(page.locator('#EditDegreeCourseComponentEditDepartmentName')).toHaveValue('Fachbereich 6');
// 	await expect(page.locator('#EditDegreeCourseComponentEditDepartmentShortName')).toHaveValue('F-VI');
// 	await page.locator('#EditDegreeCourseComponentEditDepartmentName').click();
// 	await page.locator('#EditDegreeCourseComponentEditUniversityShortName').fill(newShortName);
// 	await page.locator('#EditDegreeCourseComponentSaveDegreeCourseButton').click();
// 	await expect(page.locator(`#DegreeCourseItem${'MIB'}`)).toBeVisible();
// 	await expect(page.locator('#EditDegreeCourseComponentEditUniversityShortName')).toHaveValue('Beuth');
// });

// test('delete-degree-course', async ({ page }) => {
// 	await loginUser(page, 'admin', '123');
// 	await createDegreeCourse(page, 'BHT Berlin', 'BHT', 'Fachbereich 6', 'F-VI', 'Medieninformatik Bachelor', 'MIB');
// 	await expect(page.locator('#DegreeCourseManagementPageListComponent')).toBeVisible();
// 	await expect(page.locator('#DegreeCourseItemDeleteButton' + 'MIB')).toBeVisible();
// 	await page.locator('#DegreeCourseItemDeleteButton' + 'MIB').click();
// 	await page.locator('#DeleteDialogConfirmButton').click();
// 	await expect(page.locator(`#DegreeCourseItem${'MIB'}`)).not.toBeVisible();
// });

// test('create-application', async ({ page }) => {
// 	await loginUser(page, 'admin', '123');
// 	await createUser(page, 'yejay', 'Yejay', 'Demirkan', '123');
// 	await createDegreeCourse(page, 'BHT Berlin', 'BHT', 'Fachbereich 6', 'F-VI', 'Medieninformatik Bachelor', 'MIB');
// 	await page.locator(`#CreateDegreeCourseApplicationForDegreeCourse${'MIB'}`).click();
// 	await page.locator('#CreateDegreeCourseApplicationEditUserID').click();
// 	await page.locator('#CreateDegreeCourseApplicationEditUserID').fill('yejay');
// 	await page.locator('#CreateDegreeCourseApplicationEditTargetPeriodYear').type('2026');
// 	await page.locator('#CreateDegreeCourseApplicationEditTargetPeriodName').selectOption({ label: 'SoSe' });
// 	await page.locator('#CreateDegreeCourseApplicationCreateButton').click();
// 	await page.locator('#OpenDegreeCourseApplicationManagementPageButton').click();
// });

// test('delete-application', async ({ page }) => {
// 	await loginUser(page, 'admin', '123');
// 	await createUser(page, 'yejay', 'Yejay', 'Demirkan', '123');
// 	await createDegreeCourse(page, 'BHT Berlin', 'BHT', 'Fachbereich 6', 'F-VI', 'Medieninformatik Bachelor', 'MIB');
// 	await page.locator(`#CreateDegreeCourseApplicationForDegreeCourse${'MIB'}`).click();
// 	await page.locator('#CreateDegreeCourseApplicationEditUserID').click();
// 	await page.locator('#CreateDegreeCourseApplicationEditUserID').fill('yejay');
// 	await page.locator('#CreateDegreeCourseApplicationEditTargetPeriodYear').type('2026');
// 	await page.locator('#CreateDegreeCourseApplicationEditTargetPeriodName').selectOption({ label: 'SoSe' });
// 	await page.locator('#CreateDegreeCourseApplicationCreateButton').click();
// 	await page.locator('#OpenDegreeCourseApplicationManagementPageButton').click();
// 	await expect(page.locator(`#DegreeCourseApplicationItem${'yejayMIB2026'}`)).toBeVisible();
// 	await page.locator(`#DegreeCourseApplicationItemDeleteButton${'yejayMIB2026'}`).click();
// 	await page.locator('#DeleteDialogConfirmButton').click();
// 	await expect(page.locator(`#DegreeCourseApplicationItem${'yejayMIB2026'}`)).not.toBeVisible();
// });
