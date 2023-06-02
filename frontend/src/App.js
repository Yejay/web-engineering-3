import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './react/authentication/components/LandingPage';
import PrivatePage from './react/authentication/components/PrivatePage';
import UserManagementPage from './react/userEntity/components/UserManagementPage';
import DegreeCourseManagementPage from './react/degreeEntity/components/DegreeCourseManagementPage';
import ApplicationManagementPage from './react/applicationEntity/components/ApplicationManagementPage';

function App() {
	const user = useSelector((state) => state.auth.user);
	// Codespace test
	const main = user ? (
		<Routes>
			<Route path='/' element={<PrivatePage />} />
			{user.isAdministrator ? <Route path='/userManagement' element={<UserManagementPage />} /> : null}
			{user ? <Route path='/degreeCourseManagement' element={<DegreeCourseManagementPage />} /> : null}
			{user ? <Route path='/applicationManagement' element={<ApplicationManagementPage />} /> : null}
		</Routes>
	) : (
		<Routes>
			<Route path='/' element={<LandingPage />} />
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);

	return <div>{main}</div>;
}

export default App;
