import axios from 'axios';
import {
	getAllApplicationsPending,
	getAllApplicationsSuccess,
	getAllApplicationsError,
	createApplicationPending,
	createApplicationSuccess,
	createApplicationError,
	deleteApplicationPending,
	deleteApplicationSuccess,
	deleteApplicationError,
} from '../state/applicationsSlice';

const URL = process.env.REACT_APP_SERVER_URL;

export const getAllApplications = (token, user) => async (dispatch) => {
	dispatch(getAllApplicationsPending());
	try {
		const response = await axios.get(user.isAdministrator ? URL + 'degreeCourseApplications' : URL + 'degreeCourseApplications/myApplications', {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});

		dispatch(getAllApplicationsSuccess({ applications: response.data }));
	} catch (error) {
		console.log(error);
		dispatch(getAllApplicationsError(error.toString()));
	}
};

export const getLoggedInUserApplications = (token) => async (dispatch) => {
	dispatch(getAllApplicationsPending());
	try {
		const response = await axios.get(URL + 'degreeCourseApplications/myApplications', {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});

		dispatch(getAllApplicationsSuccess({ applications: response.data }));
	} catch (error) {
		console.log(error);
		dispatch(getAllApplicationsError(error.toString()));
	}
};

export const createApplication = (application, token) => async (dispatch) => {
	dispatch(createApplicationPending());
	try {
		const response = await axios.post(URL + 'degreeCourseApplications', application, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
			body: application,
		});
		dispatch(createApplicationSuccess(response.data));
		dispatch(getAllApplications(token, application.applicantUserID));
	} catch (error) {
		console.log(error);
		dispatch(createApplicationError(error.toString()));
	}
};

export const deleteApplication = (id, token) => async (dispatch) => {
	dispatch(deleteApplicationPending());
	try {
		await axios.delete(URL + `degreeCourseApplications/${id}`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		dispatch(deleteApplicationSuccess(id));
	} catch (error) {
		console.log(error);
		dispatch(deleteApplicationError(error.toString()));
	}
};
