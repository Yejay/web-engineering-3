import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import TopMenu from './TopMenu';

const mockState = {
	auth: {
		user: {
			isAdministrator: false,
			userID: 'Test User',
		},
	},
};

const mockStore = createStore(() => mockState);

describe('TopMenu', () => {
	test('renders the home button', () => {
		render(
			<Provider store={mockStore}>
				<TopMenu />
			</Provider>
		);
		const homeButton = screen.getByTestId('OpenStartPageButton');
		expect(homeButton).toBeInTheDocument();
	});

	test('renders user specific buttons when user is logged in', () => {
		render(
			<Provider store={mockStore}>
				<TopMenu />
			</Provider>
		);
		const userManagementButton = screen.getByTestId('OpenUserManagementPageButton');
		const degreeCourseManagementButton = screen.getByTestId('OpenDegreeCourseManagementPageButton');
		const applicationManagementButton = screen.getByTestId('OpenDegreeCourseApplicationManagementPageButton');
		expect(userManagementButton).toBeInTheDocument();
		expect(degreeCourseManagementButton).toBeInTheDocument();
		expect(applicationManagementButton).toBeInTheDocument();
	});

	test('does not render user specific buttons when user is not logged in', () => {
		const mockStateWithoutUser = { ...mockState, auth: { user: null } };
		const mockStoreWithoutUser = createStore(() => mockStateWithoutUser);
		render(
			<Provider store={mockStoreWithoutUser}>
				<TopMenu />
			</Provider>
		);
		const userManagementButton = screen.queryByTestId('OpenUserManagementPageButton');
		const degreeCourseManagementButton = screen.queryByTestId('OpenDegreeCourseManagementPageButton');
		const applicationManagementButton = screen.queryByTestId('OpenDegreeCourseApplicationManagementPageButton');
		expect(userManagementButton).not.toBeInTheDocument();
		expect(degreeCourseManagementButton).not.toBeInTheDocument();
		expect(applicationManagementButton).not.toBeInTheDocument();
	});

	test('displays user ID when user is logged in', () => {
		render(
			<Provider store={mockStore}>
				<TopMenu />
			</Provider>
		);
		const signedInText = screen.getByText(/Signed in as: Test User/i);
		expect(signedInText).toBeInTheDocument();
	});

	test('does not display user ID when user is not logged in', () => {
		const mockStateWithoutUser = { ...mockState, auth: { user: null } };
		const mockStoreWithoutUser = createStore(() => mockStateWithoutUser);
		render(
			<Provider store={mockStoreWithoutUser}>
				<TopMenu />
			</Provider>
		);
		const signedInText = screen.queryByText(/Signed in as: Test User/i);
		expect(signedInText).not.toBeInTheDocument();
	});
});
