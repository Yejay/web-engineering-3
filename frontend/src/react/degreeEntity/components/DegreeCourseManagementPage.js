import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDegrees } from '../state/degrees';
import TopMenu from '../../authentication/components/TopMenu';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { toggleCreateDialog } from '../state/degreesSlice';
import DegreeCards from './DegreeCards';
import CreateDegreeModal from './CreateDegreeModal';
import UpdateDegreeModal from './UpdateDegreeModal';
import DeleteDegreeModal from './DeleteDegreeModal';
import { Container } from 'react-bootstrap';
import CreateApplicationModal from '../../applicationEntity/components/CreateApplicationModal';

function DegreeCourseManagementPage() {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.auth.user);
	const accessToken = useSelector((state) => state.auth.accessToken);

	useEffect(() => {
		if (accessToken) dispatch(getAllDegrees(accessToken));
	}, [accessToken, dispatch]);

	return (
		<div id='DegreeCourseManagementPage'>
			<TopMenu />
			<Container className='jumbotron'>
				{user.isAdministrator ? <h1 className='display-4'>Welcome to the degree course management page.</h1> : <h1 className='display-4'>Degree courses</h1>}
				{user.isAdministrator ? (
					<p className='lead'>As an admin you can create, edit or delete degree courses. Additionaly, you can also create applications for other users here.</p>
				) : (
					<p className='lead'>Look through our wide range of degree courses.</p>
				)}
				<hr className='my-4' />

				<ButtonToolbar aria-label='Toolbar with button groups'>
					{user.isAdministrator ? (
						<Button variant='success' size='lg' onClick={() => dispatch(toggleCreateDialog())} className='m-2' id='DegreeCourseManagementPageCreateDegreeCourseButton'>
							+ Add a new degree course
						</Button>
					) : null}
				</ButtonToolbar>
				<DegreeCards />
				<CreateDegreeModal />
				<UpdateDegreeModal />
				<DeleteDegreeModal />
				<CreateApplicationModal />
			</Container>
		</div>
	);
}
export default DegreeCourseManagementPage;
