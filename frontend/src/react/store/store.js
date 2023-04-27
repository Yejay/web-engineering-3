import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authentication/state/authSlice';
import usersReducer from '../userEntity/state/usersSlice';
import degreesSlice from '../degreeEntity/state/degreesSlice';
import applicationsSlice from '../applicationEntity/state/applicationsSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		users: usersReducer,
		degrees: degreesSlice,
		applications: applicationsSlice,
	},
	devTools: true,
});
