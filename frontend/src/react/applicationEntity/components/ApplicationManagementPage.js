import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TopMenu from '../../authentication/components/TopMenu';
import ApplicationCards from '../components/ApplicationCards';
import { Container } from 'react-bootstrap';
import DeleteApplicationModal from '../components/DeleteApplicationModal';
import { getAllApplications } from '../state/applications';

function ApplicationManagementPage() {
	const dispatch = useDispatch();
	const accessToken = useSelector((state) => state.auth.accessToken);
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (accessToken) dispatch(getAllApplications(accessToken, user));
	}, [accessToken, user, dispatch]);

	return (
		<div id='DegreeCourseApplicationManagementPage'>
			<TopMenu />
			<Container className='jumbotron'>
				<h1 className='display-4'>Welcome to the application management page.</h1>
				<p className='lead'>We are a leading institution in the field of higher education, offering a wide range of degree programs for students to choose from.</p>
				<hr className='my-4' />
				<ApplicationCards />
				<DeleteApplicationModal />
			</Container>
		</div>
	);
}
export default ApplicationManagementPage;
