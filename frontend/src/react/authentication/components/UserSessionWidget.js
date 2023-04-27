import { Button, Modal, Form } from 'react-bootstrap';
import { authenticateUser, logout } from '../state/auth';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginDialogAction, hideLoginDialogAction, updateUserIDAction, updatePasswordAction } from '../state/authSlice';
import Spinner from 'react-bootstrap/Spinner';
import { MdLogin, MdLogout } from 'react-icons/md';

function UserSessionWidget() {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.auth.user);
	const loginPending = useSelector((state) => state.auth.loginPending);
	const userID = useSelector((state) => state.auth.userID);
	const password = useSelector((state) => state.auth.password);
	const showLoginDialog = useSelector((state) => state.auth.showLoginDialog);

	const handleChange = (event) => {
		if (event.target.name === 'userID') {
			dispatch(updateUserIDAction(event.target.value));
		} else if (event.target.name === 'password') {
			dispatch(updatePasswordAction(event.target.value));
		}
	};

	return (
		<div>
			{user ? (
				<div>
					<Button variant='secondary' id='LogoutButton' onClick={() => dispatch(logout())}>
						<MdLogout size={30} />
					</Button>
				</div>
			) : (
				<div>
					<Button variant='primary' id='OpenLoginDialogButton' onClick={() => dispatch(showLoginDialogAction())}>
						<MdLogin size={30} />
					</Button>
					<Modal id='LoginDialog' className='login-modal' show={showLoginDialog} onHide={() => dispatch(hideLoginDialogAction())}>
						<Modal.Header closeButton>
							<Modal.Title>Login</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form>
								<Form.Group>
									<Form.Label>User ID</Form.Label>
									<Form.Control id='LoginDialogUserIDText' name='userID' type='text' value={userID} onChange={handleChange} placeholder='Enter user ID' required />
								</Form.Group>

								<Form.Group>
									<Form.Label>Password</Form.Label>
									<Form.Control id='LoginDialogPasswordText' name='password' type='password' value={password} onChange={handleChange} placeholder='Password' required />
								</Form.Group>
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<Button variant='secondary' onClick={() => dispatch(hideLoginDialogAction())}>
								Close
							</Button>
							<Button id='PerformLoginButton' variant='primary' onClick={() => dispatch(authenticateUser(userID, password))}>
								{loginPending ? <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' /> : null}
								Login
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			)}
		</div>
	);
}

export default UserSessionWidget;
