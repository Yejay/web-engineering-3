import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	degree: {},
	degrees: [],
	accessToken: null,
	pending: false,
	error: null,
	showCreateDialog: false,
	showEditDialog: false,
	showDeleteDialog: false,
};

const degreesSlice = createSlice({
	name: 'degrees',
	initialState,
	reducers: {
		getAllDegreesPending: (state) => {
			state.pending = true;
		},
		getAllDegreesSuccess: (state, action) => {
			state.pending = false;
			state.degrees = action.payload.degrees;
		},
		getAllDegreesError: (state, action) => {
			state.pending = false;
			state.error = action.payload;
		},
		createDegreePending: (state) => {
			state.pending = true;
		},
		createDegreeSuccess: (state, action) => {
			state.pending = false;
			state.degrees.push(action.payload);
		},
		createDegreeError: (state, action) => {
			state.pending = false;
			state.error = action.payload;
		},
		updateDegreePending: (state) => {
			state.pending = true;
		},
		updateDegreeSuccess: (state, action) => {
			state.pending = false;
			const index = state.degrees.findIndex((degree) => degree.id === action.payload.id);
			state.degrees[index] = action.payload;
		},
		updateDegreeError: (state, action) => {
			state.pending = false;
			state.error = action.payload;
		},
		deleteDegreePending: (state) => {
			state.pending = true;
		},
		deleteDegreeSuccess: (state, action) => {
			state.pending = false;
			state.degrees = state.degrees.filter((degree) => degree.id !== action.payload);
		},
		deleteDegreeError: (state, action) => {
			state.pending = false;
			state.error = action.payload;
		},
		toggleCreateDialog: (state) => {
			state.showCreateDialog = !state.showCreateDialog;
		},
		toggleEditDialog: (state, action) => {
			state.showEditDialog = !state.showEditDialog;
			if (action.payload && action.payload.degree.id) {
				state.degree = action.payload.degree;
			}
		},
		toggleDeleteDialog: (state, action) => {
			state.showDeleteDialog = !state.showDeleteDialog;
			if (action.payload && action.payload.degree.id) {
				state.degree = action.payload.degree;
			}
		},
	},
});

export const {
	getAllDegreesPending,
	getAllDegreesSuccess,
	getAllDegreesError,
	createDegreePending,
	createDegreeSuccess,
	createDegreeError,
	updateDegreePending,
	updateDegreeSuccess,
	updateDegreeError,
	deleteDegreePending,
	deleteDegreeSuccess,
	deleteDegreeError,
	toggleCreateDialog,
	toggleEditDialog,
	toggleDeleteDialog,
} = degreesSlice.actions;
export default degreesSlice.reducer;
