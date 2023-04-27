import axios from 'axios';
import {
	getAllUsersPending,
	getAllUsersSuccess,
	getAllUsersError,
	createUserPending,
	createUserSuccess,
	createUserError,
	updateUserPending,
	updateUserSuccess,
	updateUserError,
	deleteUserPending,
	deleteUserSuccess,
	deleteUserError,
} from './usersSlice';

const URL = process.env.REACT_APP_SERVER_URL;
export const getAllUsers = (token) => async (dispatch) => {
	dispatch(getAllUsersPending());
	try {
		const response = await axios.get(URL + 'users', {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		dispatch(getAllUsersSuccess({ users: response.data }));
	} catch (error) {
		console.log(error);
		dispatch(getAllUsersError(error.toString()));
	}
};

export const createUser = (user, token) => async (dispatch) => {
	dispatch(createUserPending());
	try {
		const response = await axios.post(URL + 'users', user, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
			body: {
				userID: user.userID,
				firstName: user.firstName,
				lastName: user.lastName,
				password: user.password,
				isAdministrator: user.isAdministrator,
			},
		});
		dispatch(createUserSuccess(response.data));
		dispatch(getAllUsers(token));
	} catch (error) {
		console.log(error);
		dispatch(createUserError(error.toString()));
	}
};

export const updateUser = (user, token) => async (dispatch) => {
	dispatch(updateUserPending());
	try {
		const response = await axios.put(URL + `users/${user.userID}`, user, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
			body: {
				userID: user.userID,
				firstName: user.firstName,
				lastName: user.lastName,
				password: user.password,
				isAdministrator: user.isAdministrator,
			},
		});
		dispatch(updateUserSuccess(response.data));
		dispatch(getAllUsers(token));
	} catch (error) {
		console.log(error);
		dispatch(updateUserError(error.toString()));
	}
};

export const deleteUser = (id, token) => async (dispatch) => {
	dispatch(deleteUserPending());
	try {
		await axios.delete(URL + `users/${id}`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		dispatch(deleteUserSuccess(id));
		dispatch(getAllUsers(token));
	} catch (error) {
		console.log(error);
		dispatch(deleteUserError(error.toString()));
	}
};
