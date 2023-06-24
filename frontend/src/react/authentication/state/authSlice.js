import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	userID: '',
	password: '',
	accessToken: null,
	loginPending: false,
	error: null,
	showLoginDialog: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		showLoginDialogAction: (state) => {
			state.showLoginDialog = true;
			state.error = null;
		},
		hideLoginDialogAction: (state) => {
			state.showLoginDialog = false;
			state.error = null;
		},
		authPendingAction: (state) => {
			state.loginPending = true;
			state.error = null;
		},
		// authSuccessAction: (state, action) => {
		// 	state.showLoginDialog = false;
		// 	state.loginPending = false;
		// 	console.log(state.userID);
		// 	console.log(state.user);
		// 	state.user = action.payload.user;
		// 	state.accessToken = action.payload.accessToken;
		// },
		authSuccessAction: (state, action) => {
			state.showLoginDialog = false;
			state.loginPending = false;
			state.user = {
				userID: action.payload.user.user,
				...action.payload.user,
			};
			state.accessToken = action.payload.accessToken;
		},

		authErrorAction: (state, action) => {
			state.loginPending = false;
			state.error = action.payload;
		},
		authLogoutAction: (state) => {
			state.user = null;
			state.accessToken = null;
		},
		updateUserIDAction: (state, action) => {
			state.userID = action.payload;
		},
		updatePasswordAction: (state, action) => {
			state.password = action.payload;
		},
	},
});

export const { showLoginDialogAction, hideLoginDialogAction, authPendingAction, authSuccessAction, authErrorAction, authLogoutAction, updateUserIDAction, updatePasswordAction } = authSlice.actions;

export default authSlice.reducer;
