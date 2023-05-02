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

async function createDegreeCourse(page, universityName, universityShortName, departmentName, departmentShortName, degreeCourseName, degreeCourseShortName) {
	await page.locator('#OpenDegreeCourseManagementPageButton').click();
	await page.locator('#DegreeCourseManagementPageCreateDegreeCourseButton').click();
	await page.locator('#CreateDegreeCourseComponentEditUniversityName').click();
	await page.locator('#CreateDegreeCourseComponentEditUniversityName').fill(universityName);
	await page.locator('#CreateDegreeCourseComponentEditUniversityShortName').click();
	await page.locator('#CreateDegreeCourseComponentEditUniversityShortName').fill(universityShortName);
	await page.locator('#CreateDegreeCourseComponentEditDepartmentName').click();
	await page.locator('#CreateDegreeCourseComponentEditDepartmentName').fill(departmentName);
	await page.locator('#CreateDegreeCourseComponentEditDepartmentShortName').click();
	await page.locator('#CreateDegreeCourseComponentEditDepartmentShortName').fill(departmentShortName);
	await page.locator('#CreateDegreeCourseComponentEditName').click();
	await page.locator('#CreateDegreeCourseComponentEditName').fill(degreeCourseName);
	await page.locator('#CreateDegreeCourseComponentEditShortName').click();
	await page.locator('#CreateDegreeCourseComponentEditShortName').fill(degreeCourseShortName);
	await page.locator('#CreateDegreeCourseComponentCreateDegreeCourseButton').click();
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

test('Successfully create an user', async ({ page }) => {
	await loginUser(page, 'admin', '123');
	await createUser(page, 'yejay', 'Yejay', 'Demirkan', '123');
	const userCard = page.locator('#UserItemyejay');
	await expect(userCard).toBeVisible();
});

test('Delete a user', async ({ page }) => {
	await loginUser(page, 'admin', '123');
	await createUser(page, 'yejay', 'Yejay', 'Demirkan', '123');
	await page.locator(`#UserItemDeleteButton${'yejay'}`).click();
	const modal = page.locator('.modal-content');
	await expect(modal).toBeVisible();
	await page.locator('#DeleteDialogConfirmButton').click();
	const userCard = page.locator(`#UserItem${'yejay'}`);
	await expect(userCard).not.toBeVisible();
});

test('Edit the created user', async ({ page }) => {
	const newFirstName = 'koray';
	await loginUser(page, 'admin', '123');
	await createUser(page, 'yejay', 'Yejay', 'Demirkan', '123');
	await page.locator('#UserItemEditButton' + 'yejay').click();
	const userIDField = page.locator('#EditUserComponentEditUserID');
	await expect(userIDField).toBeDisabled();
	await page.locator('#EditUserComponentEditFirstName').click();
	await page.locator('#EditUserComponentEditFirstName').fill(newFirstName);
	await page.locator('#EditUserComponentSaveUserButton').click();
	const userCard = page.locator(`#UserItem${'yejay'}`);
	await expect(userCard).toBeVisible();
	const firstNameField = page.locator(`#UserItem${'yejay'}`).locator('#FirstName');
	await expect(firstNameField).toHaveText('First Name: koray');
});

test('create-degree-course', async ({ page }) => {
	await loginUser(page, 'admin', '123');
	await createUser(page, 'yejay', 'Yejay', 'Demirkan', '123');
	await createDegreeCourse(page, 'BHT Berlin', 'BHT', 'Fachbereich 6', 'F-VI', 'Medieninformatik Bachelor', 'MIB');

	const degreeCourseName = 'Medieninformatik Bachelor';

	// ... create the degree course and perform other necessary actions

	// Then, check for the element's visibility using the text content
	await expect(page.locator(`text=${degreeCourseName}`)).toBeVisible();
});

test('create-degree-course-v2', async ({ page }) => {
	await loginUser(page, 'admin', '123');
	await createDegreeCourse(page, 'BHT Berlin', 'BHT', 'Fachbereich 6', 'F-VI', 'Medieninformatik Bachelor', 'MIB');
	const degreeCourseCard = page.locator('.degree-cards:has-text("Medieninformatik Bachelor")');
	await expect(degreeCourseCard).toBeVisible();
});

// TODO
test('edit-degree-course', async ({ page }) => {
	const newShortName = 'Beuth';
	await loginUser(page, 'admin', '123');
	await createDegreeCourse(page, 'BHT Berlin', 'BHT', 'Fachbereich 6', 'F-VI', 'Medieninformatik Bachelor', 'MIB');

	await page.locator('text=Edit').click();
	await expect(page.locator('.modal-content')).toBeVisible();
	await expect(page.locator('#EditDegreeCourseComponentEditName')).toHaveValue('Medieninformatik Bachelor');
	await expect(page.locator('#EditDegreeCourseComponentEditShortName')).toHaveValue('MIB');
	await expect(page.locator('#EditDegreeCourseComponentEditUniversityName')).toHaveValue('BHT Berlin');
	await expect(page.locator('#EditDegreeCourseComponentEditUniversityShortName')).toHaveValue('BHT');

	await expect(page.locator('#EditDegreeCourseComponentEditDepartmentName')).toHaveValue('Fachbereich 6');
	await expect(page.locator('#EditDegreeCourseComponentEditDepartmentShortName')).toHaveValue('F-VI');

	await page.locator('#EditDegreeCourseComponentEditDepartmentName').click();
	await page.locator('#EditDegreeCourseComponentEditDepartmentName').fill(newShortName);

	await page.locator('#EditDegreeCourseComponentSaveDegreeCourseButton').click();
	const degreeCourseCard = page.locator('.degree-cards:has-text("Beuth")');
	await expect(degreeCourseCard).toBeVisible();
});

// TODO
test('delete-degree-course', async ({ page }) => {
	await loginUser(page, 'admin', '123');
	await createDegreeCourse(page, 'BHT Berlin', 'BHT', 'Fachbereich 6', 'F-VI', 'Medieninformatik Bachelor', 'MIB');

	await expect(page.locator('#DegreeCourseManagementPageListComponent')).toBeVisible();

	await page.locator(`#DegreeCourseItemDeleteButton${degreeCourseData.name}`).click();
	await page.locator('#DeleteDialogConfirmButton').click();
	await expect(page.locator(`#DegreeCourseItem${degreeCourseData.name}`)).not.toBeVisible();
});

// TODO
test('create-application', async ({ page }) => {
	await loginUser(page, 'admin', '123');
	await createUser(page, 'yejay', 'Yejay', 'Demirkan', '123');
	await createDegreeCourse(page, 'BHT Berlin', 'BHT', 'Fachbereich 6', 'F-VI', 'Medieninformatik Bachelor', 'MIB');
	await page.locator('#OpenDegreeCourseManagementPageButton').click();
	await page.locator('[role="button"]').locator(`text=${'Create Application'}`).click();

	await page.locator('#CreateDegreeCourseApplicationEditTargetPeriodYear').type('2024');
	await page.locator('#CreateDegreeCourseApplicationEditTargetPeriodName').selectOption({ label: 'WiSe' });
	await page.locator('#CreateDegreeCourseApplicationCreateButton').click();
	await page.locator('#OpenDegreeCourseApplicationManagementPageButton').click();
});

// TODO
test('delete-application', async ({ page }) => {
	await loginUser(page, 'admin', '123');
	await createUser(page, 'yejay', 'Yejay', 'Demirkan', '123');
	await createDegreeCourse(page, 'BHT Berlin', 'BHT', 'Fachbereich 6', 'F-VI', 'Medieninformatik Bachelor', 'MIB');
	
	const degreeCourseCard = page.locator(`#DegreeCourseItem${degreeCourseData.name}`);
	await expect(degreeCourseCard).toBeVisible();
	await page.locator('#OpenDegreeCourseManagementPageButton').click();
	await page.locator(`#CreateDegreeCourseApplicationForDegreeCourse${degreeCourseData.name}`).click();

	await expect(page.locator('#CreateDegreeComponentEditDepartmentShortName')).toBeDisabled();
	await expect(page.locator('#CreateDegreeComponentEditDepartmentShortName')).toHaveValue(degreeCourseData.name);

	await page.locator('#CreateDegreeCourseApplicationEditTargetPeriodYear').click();
	await page.locator('#CreateDegreeCourseApplicationEditTargetPeriodYear').type('2024');
	await page.locator('#CreateDegreeCourseApplicationEditTargetPeriodName').selectOption({ label: 'Winter semester' });
	await page.locator('#CreateDegreeCourseApplicationCreateButton').click();

	await expect(page.locator('#DegreeCourseManagementPage')).toBeVisible();

	await page.locator('#OpenDegreeCourseApplicationManagementPageButton').click();
	await expect(page.locator(`#DegreeCourseApplicationItem${degreeCourseData.name + applicationData.targetYear}`)).toBeVisible();

	await page.locator(`#DegreeCourseApplicationItemDeleteButton${degreeCourseData.name}${applicationData.targetYear}`).click();
	await page.locator('#DeleteDialogConfirmButton').click();
	await expect(page.locator(`#DegreeCourseApplicationItem${degreeCourseData.name}${applicationData.targetYear}`)).not.toBeVisible();
});
