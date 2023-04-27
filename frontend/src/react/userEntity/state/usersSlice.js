import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: {},
	users: [],
	accessToken: null,
	pending: false,
	error: null,
	showCreateDialog: false,
	showEditDialog: false,
	showDeleteDialog: false,
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		getAllUsersPending: (state) => {
			state.pending = true;
		},
		getAllUsersSuccess: (state, action) => {
			state.pending = false;
			state.users = action.payload.users;
		},
		getAllUsersError: (state, action) => {
			state.pending = false;
			state.error = action.payload;
		},
		createUserPending: (state) => {
			state.pending = true;
		},
		createUserSuccess: (state, action) => {
			state.pending = false;
			state.users.push(action.payload);
		},
		createUserError: (state, action) => {
			state.pending = false;
			state.error = action.payload;
		},
		updateUserPending: (state) => {
			state.pending = true;
		},
		updateUserSuccess: (state, action) => {
			state.pending = false;
			const index = state.users.findIndex((user) => user.id === action.payload.id);
			state.users[index] = action.payload;
		},
		updateUserError: (state, action) => {
			state.pending = false;
			state.error = action.payload;
		},
		deleteUserPending: (state) => {
			state.pending = true;
		},
		deleteUserSuccess: (state, action) => {
			state.pending = false;
			state.users = state.users.filter((user) => user.id !== action.payload);
		},
		deleteUserError: (state, action) => {
			state.pending = false;
			state.error = action.payload;
		},
		toggleCreateDialog: (state) => {
			state.showCreateDialog = !state.showCreateDialog;
		},
		toggleEditDialog: (state, action) => {
			state.showEditDialog = !state.showEditDialog;
			if (action.payload && action.payload.user.userID) {
				state.user = action.payload.user;
			}
		},
		toggleDeleteDialog: (state, action) => {
			state.showDeleteDialog = !state.showDeleteDialog;
			if (action.payload && action.payload.user.userID) {
				state.user = action.payload.user;
			}
		},
	},
});

export const {
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
	toggleCreateDialog,
	toggleEditDialog,
	toggleDeleteDialog,
} = usersSlice.actions;
export default usersSlice.reducer;
