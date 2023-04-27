import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	application: {},
	applications: [],
	applicationDegree: {},
	accessToken: null,
	pending: false,
	error: null,
	showCreateDialog: false,
	showEditDialog: false,
	showDeleteDialog: false,
};

const applicationsSlice = createSlice({
	name: 'applications',
	initialState,
	reducers: {
		getAllApplicationsPending: (state) => {
			state.pending = true;
		},
		getAllApplicationsSuccess: (state, action) => {
			state.pending = false;
			state.applications = action.payload.applications;
		},
		getAllApplicationsError: (state, action) => {
			state.pending = false;
			state.error = action.payload;
		},
		createApplicationPending: (state) => {
			state.pending = true;
		},
		createApplicationSuccess: (state, action) => {
			state.pending = false;
			state.applications.push(action.payload);
		},
		createApplicationError: (state, action) => {
			state.pending = false;
			state.error = action.payload;
		},
		updateApplicationPending: (state) => {
			state.pending = true;
		},
		updateApplicationSuccess: (state, action) => {
			state.pending = false;
			const index = state.applications.findIndex((application) => application.id === action.payload.id);
			state.applications[index] = action.payload;
		},
		updateApplicationError: (state, action) => {
			state.pending = false;
			state.error = action.payload;
		},
		deleteApplicationPending: (state) => {
			state.pending = true;
		},
		deleteApplicationSuccess: (state, action) => {
			state.pending = false;
			state.application = state.applications.filter((application) => application.id !== action.payload);
		},
		deleteApplicationError: (state, action) => {
			state.pending = false;
			state.error = action.payload;
		},
		toggleApplicationCreateDialog: (state, action) => {
			state.showCreateDialog = !state.showCreateDialog;
			if (action.payload && action.payload.degree.id) {
				state.applicationDegree = action.payload.degree;
			}
		},
		toggleApplicationEditDialog: (state, action) => {
			state.showEditDialog = !state.showEditDialog;
			if (action.payload && action.payload.application.id) {
				state.application = action.payload.application;
			}
		},
		toggleApplicationDeleteDialog: (state, action) => {
			state.showDeleteDialog = !state.showDeleteDialog;
			if (action.payload && action.payload.application.id) {
				state.application = action.payload.application;
			}
		},
	},
});

export const {
	getAllApplicationsPending,
	getAllApplicationsSuccess,
	getAllApplicationsError,
	createApplicationPending,
	createApplicationSuccess,
	createApplicationError,
	updateApplicationPending,
	updateApplicationSuccess,
	updateApplicationError,
	deleteApplicationPending,
	deleteApplicationSuccess,
	deleteApplicationError,
	toggleApplicationCreateDialog,
	toggleApplicationEditDialog,
	toggleApplicationDeleteDialog,
} = applicationsSlice.actions;
export default applicationsSlice.reducer;
