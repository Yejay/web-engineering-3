import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { toggleDeleteDialog, toggleEditDialog } from '../state/usersSlice';
import { getAllUsers } from '../state/users';

function UserCards() {
	const users = useSelector((state) => state.users.users);
	const accessToken = useSelector((state) => state.auth.accessToken);
	const dispatch = useDispatch();

	useEffect(() => {
		if (accessToken) dispatch(getAllUsers(accessToken));
	}, [accessToken, dispatch]);

	return (
		<div id='UserManagementPageListComponent' className='d-flex flex-wrap'>
			{users &&
				users.map((user) => {
					const editButtonId = `UserItemEditButton${user.userID}`;
					const deleteButtonId = `UserItemDeleteButton${user.userID}`;
					const id = `UserItem${user.userID}`;
					return (
						<Card bg='dark' border='secondary' text='light' id={id} className='m-2 user-cards' style={{ width: '26.75rem' }} key={user.id}>
							<Card.Body>
								<Card.Header>
									<Card.Title>
										<b>
											<u>User Info Card:</u>
										</b>
									</Card.Title>
								</Card.Header>

								<Card.Text id='UserID'>
									<b>User ID:</b> {user.userID}
								</Card.Text>
								<Card.Text id='FirstName'>
									<b>First Name:</b> {user.firstName}
								</Card.Text>
								<Card.Text id='LastName'>
									<b>Last Name:</b> {user.lastName}
								</Card.Text>
								<Card.Text>
									<b>Admin:</b> {user.isAdministrator.toString()}
								</Card.Text>
							</Card.Body>
							<Button id={editButtonId} className='m-2' variant='outline-warning' onClick={() => dispatch(toggleEditDialog({ user }))}>
								<b>Edit</b>
							</Button>
							<Button id={deleteButtonId} className='m-2' variant='outline-danger' onClick={() => dispatch(toggleDeleteDialog({ user }))}>
								<b>Delete</b>
							</Button>
						</Card>
					);
				})}
		</div>
	);
}

export default UserCards;
