import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import { deleteUser } from '../state/users';
import { toggleDeleteDialog } from '../state/usersSlice';

function DeleteModal() {
	const dispatch = useDispatch();
	const showDeleteDialog = useSelector((state) => state.users.showDeleteDialog);
	const accessToken = useSelector((state) => state.auth.accessToken);
	const user = useSelector((state) => state.users.user);

	const handleSubmit = (event) => {
		event.preventDefault();
		const userID = user.userID;
		dispatch(deleteUser(userID, accessToken));
		dispatch(toggleDeleteDialog());
	};

	const id = `DeleteDialogUser${user.userID}`;
	return (
		<Modal id={id} show={showDeleteDialog} onHide={() => dispatch(toggleDeleteDialog())}>
			<Modal.Header closeButton>
				<Modal.Title>Delete User</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mt-3'>
						<Form.Label>User-ID</Form.Label>
						<Form.Control name='userID' type='text' value={user.userID} disabled />
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>First Name</Form.Label>
						<Form.Control name='firstName' type='text' placeholder='Enter First Name' value={user.firstName} disabled />
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Last Name</Form.Label>
						<Form.Control name='lastName' type='text' placeholder='Enter Last Name' value={user.lastName} disabled />
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Password</Form.Label>
						<Form.Control name='lastName' type='password' placeholder='Enter Password' value={user.password} disabled />
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Check name='isAdmin' type='checkbox' label='Administrator' checked={user.isAdministrator} disabled />
					</Form.Group>
					<Button id='DeleteDialogConfirmButton' variant='danger' type='submit'>
						Delete User
					</Button>
					<Button id='DeleteDialogCancelButton' variant='secondary' onClick={() => dispatch(toggleDeleteDialog())}>
						Cancel
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default DeleteModal;
