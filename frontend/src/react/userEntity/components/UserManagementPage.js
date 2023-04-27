import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../state/users';
import TopMenu from '../../authentication/components/TopMenu';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { toggleCreateDialog } from '../state/usersSlice';
import UserCards from './UserCards';
import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import { Container } from 'react-bootstrap';

function UserManagementPage() {
	const dispatch = useDispatch();
	const accessToken = useSelector((state) => state.auth.accessToken);

	useEffect(() => {
		if (accessToken) dispatch(getAllUsers(accessToken));
	}, [accessToken, dispatch]);

	return (
		<div id='UserManagementPage'>
			<TopMenu />
			<Container className='jumbotron'>
				<h1 className='display-4'>Welcome to the user management page.</h1>
				<p className='lead'>Here you can create, edit or delete users as you wish.</p>
				<hr className='my-4' />

				<ButtonToolbar aria-label='Toolbar with button groups'>
					<Button variant='success' id='UserManagementPageCreateUserButton' size='lg' className='m-2' onClick={() => dispatch(toggleCreateDialog())}>
						+ Add a new user
					</Button>
				</ButtonToolbar>
				<UserCards />
				<CreateModal />
				<UpdateModal />
				<DeleteModal />
			</Container>
		</div>
	);
}
export default UserManagementPage;
