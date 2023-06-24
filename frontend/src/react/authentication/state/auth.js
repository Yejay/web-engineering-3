import { authSuccessAction, authErrorAction, authLogoutAction, authPendingAction } from './authSlice';
import axios from 'axios';
import base64 from 'base-64';

const URL = process.env.REACT_APP_SERVER_URL;

// export const handleResponse = (response) => {
// 	const authorizationHeader = response.headers.get('Authorization');
// 	try {
// 		let data;
// 		var token;
// 		if (authorizationHeader) {
// 			token = authorizationHeader.split(' ')[1];
// 			data = JSON.parse(atob(token.split('.')[1]));
// 		}
// 		switch (response.status) {
// 			case 401:
// 				logout();
// 				return Promise.reject('Unauthorized');
// 			case 200:
// 				let userSession = {
// 					user: data,
// 					accessToken: token,
// 				};
// 				return userSession;
// 			default:
// 				return Promise.reject(response.statusText);
// 		}
// 	} catch (error) {
// 		throw error;
// 	}
// };

export const handleResponse = (response) => {
	console.log('Response:', response);
	const authorizationHeader = response.headers.get('Authorization');
	console.log('Authorization header:', authorizationHeader);
	try {
		let data;
		var token;
		if (authorizationHeader) {
			token = authorizationHeader.split(' ')[1];
			console.log('Token:', token);
			data = JSON.parse(atob(token.split('.')[1]));
			console.log('Decoded data:', data);
		}
		switch (response.status) {
			case 401:
				console.log('Status 401: Unauthorized');
				logout();
				return Promise.reject('Unauthorized');
			case 200:
				let userSession = {
					user: data,
					accessToken: token,
				};
				console.log('User session:', userSession);
				return userSession;
			default:
				console.log('Unexpected status:', response.status);
				return Promise.reject(response.statusText);
		}
	} catch (error) {
		console.log('Error:', error);
		throw error;
	}
};

export const authenticateUser = (userID, password) => async (dispatch) => {
	dispatch(authPendingAction());
	try {
		const response = await axios.get(URL + 'authenticate', {
			headers: {
				Authorization: 'Basic ' + base64.encode(userID + ':' + password),
			},
		});
		console.log('TEST' + JSON.stringify(response.data));
		const userSession = handleResponse(response);
		dispatch(authSuccessAction({ user: userSession.user, accessToken: userSession.accessToken }));
	} catch (error) {
		console.log(error);
		dispatch(authErrorAction(error.toString()));
	}
};

export const logout = () => (dispatch) => {
	dispatch(authLogoutAction());
};
