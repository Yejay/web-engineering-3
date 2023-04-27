import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import { createUser } from '../state/users';
import { toggleCreateDialog } from '../state/usersSlice';

function CreateModal() {
	const dispatch = useDispatch();
	const showCreateDialog = useSelector((state) => state.users.showCreateDialog);
	const accessToken = useSelector((state) => state.auth.accessToken);

	const [userID, setUserID] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [isAdministrator, setIsAdministrator] = useState(false);

	const resetForm = () => {
		setUserID('');
		setFirstName('');
		setLastName('');
		setPassword('');
		setIsAdministrator(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const newUser = { userID, firstName, lastName, password, isAdministrator };
		dispatch(createUser(newUser, accessToken));
		dispatch(toggleCreateDialog());
		resetForm();
	};

	return (
		<Modal
			id='UserManagementPageCreateComponent'
			show={showCreateDialog}
			onHide={() => {
				dispatch(toggleCreateDialog());
				resetForm();
			}}
		>
			<Modal.Header closeButton>
				<Modal.Title>Create New User</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mt-3'>
						<Form.Label>User-ID</Form.Label>
						<Form.Control id='CreateUserComponentEditUserID' name='userID' type='text' placeholder='Enter User-ID' value={userID} onChange={(e) => setUserID(e.target.value)} />
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>First Name</Form.Label>
						<Form.Control
							id='CreateUserComponentEditFirstName'
							name='firstName'
							type='text'
							placeholder='Enter First Name'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Last Name</Form.Label>
						<Form.Control id='CreateUserComponentEditLastName' name='lastName' type='text' placeholder='Enter Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							id='CreateUserComponentEditPassword'
							name='lastName'
							type='password'
							placeholder='Enter Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Check
							id='CreateUserComponentEditIsAdministrator'
							name='isAdmin'
							type='checkbox'
							label='Make User Admin'
							value={isAdministrator}
							onChange={(e) => setIsAdministrator(e.target.checked)}
						/>
					</Form.Group>
					<Button id='CreateUserComponentCreateUserButton' variant='primary' type='submit'>
						Create
					</Button>
					<Button className='m-3' id='OpenUserManagementPageListComponentButton' variant='secondary' onClick={() => dispatch(toggleCreateDialog())}>
						Cancel
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default CreateModal;
