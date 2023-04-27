import axios from 'axios';
import {
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
} from './degreesSlice';

const URL = process.env.REACT_APP_SERVER_URL;

export const getAllDegrees = (token) => async (dispatch) => {
	dispatch(getAllDegreesPending());
	try {
		const response = await axios.get(URL + 'degreeCourses', {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});

		dispatch(getAllDegreesSuccess({ degrees: response.data }));
	} catch (error) {
		console.log(error);
		dispatch(getAllDegreesError(error.toString()));
	}
};

export const createDegree = (degree, token) => async (dispatch) => {
	dispatch(createDegreePending());
	try {
		const response = await axios.post(URL + 'degreeCourses', degree, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
			body: {
				universityName: degree.universityName,
				universityShortName: degree.universityShortName,
				departmentName: degree.departmentName,
				departmentShortName: degree.departmentShortName,
				name: degree.degreeCourseName,
				shortName: degree.degreeCourseShortName,
			},
		});
		dispatch(createDegreeSuccess(response.data));
	} catch (error) {
		console.log(error);
		dispatch(createDegreeError(error.toString()));
	}
};

export const updateDegree = (degreeID, degree, token) => async (dispatch) => {
	dispatch(updateDegreePending());
	try {
		const response = await axios.put(URL + `degreeCourses/${degreeID}`, degree, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
			body: {
				universityName: degree.universityName,
				universityShortName: degree.universityShortName,
				departmentName: degree.departmentName,
				departmentShortName: degree.departmentShortName,
				name: degree.degreeCourseName,
				shortName: degree.degreeCourseShortName,
			},
		});
		dispatch(updateDegreeSuccess(response.data));
	} catch (error) {
		console.log(error);
		dispatch(updateDegreeError(error.toString()));
	}
};

export const deleteDegree = (id, token) => async (dispatch) => {
	dispatch(deleteDegreePending());
	try {
		await axios.delete(URL + `degreeCourses/${id}`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		dispatch(deleteDegreeSuccess(id));
	} catch (error) {
		console.log(error);
		dispatch(deleteDegreeError(error.toString()));
	}
};
