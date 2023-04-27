import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import { updateUser } from '../state/users';
import { toggleEditDialog } from '../state/usersSlice';
import { useEffect } from 'react';

function UpdateModal() {
	const dispatch = useDispatch();
	const showEditDialog = useSelector((state) => state.users.showEditDialog);
	const accessToken = useSelector((state) => state.auth.accessToken);
	const user = useSelector((state) => state.users.user);

	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [password, setPassword] = useState(user.password);
	const [isAdministrator, setIsAdministrator] = useState(user.isAdministrator);

	useEffect(() => {
		if (!showEditDialog) {
			setFirstName('');
			setLastName('');
			setPassword('');
			setIsAdministrator(false);
		}
	}, [showEditDialog]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const userID = user.userID;
		const newUser = { userID, firstName, lastName, password, isAdministrator };

		dispatch(updateUser(newUser, accessToken));
		dispatch(toggleEditDialog());
	};

	return (
		<Modal
			id='UserManagementPageEditComponent'
			show={showEditDialog}
			onHide={() => {
				dispatch(toggleEditDialog());
			}}
		>
			<Modal.Header closeButton>
				<Modal.Title>Edit User</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mt-3'>
						<Form.Label>User-ID</Form.Label>
						<Form.Control id='EditUserComponentEditUserID' name='userID' type='text' value={user.userID} disabled />
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>First Name</Form.Label>
						<Form.Control
							id='EditUserComponentEditFirstName'
							name='firstName'
							type='text'
							placeholder='Enter First Name'
							defaultValue={user.firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							id='EditUserComponentEditLastName'
							name='lastName'
							type='text'
							placeholder='Enter Last Name'
							defaultValue={user.lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							id='EditUserComponentEditPassword'
							name='lastName'
							type='password'
							placeholder='Enter new Password'
							defaultValue={user.password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Check
							id='EditUserComponentEditIsAdministrator'
							name='isAdmin'
							type='checkbox'
							label='Make User Admin'
							checked={user.isAdministrator}
							onChange={(e) => setIsAdministrator(e.target.checked)}
						/>
					</Form.Group>
					<Button id='EditUserComponentSaveUserButton' variant='success' type='submit'>
						Save Changes
					</Button>
					<Button id='OpenUserManagementPageListComponentButton' variant='secondary' onClick={() => dispatch(toggleEditDialog())}>
						Cancel
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default UpdateModal;
