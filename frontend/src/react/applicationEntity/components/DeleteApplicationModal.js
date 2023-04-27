import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import { deleteApplication, getAllApplications } from '../state/applications';
import { toggleApplicationDeleteDialog } from '../state/applicationsSlice';

function DeleteApplicationModal() {
	const dispatch = useDispatch();

	const showDeleteDialog = useSelector((state) => state.applications.showDeleteDialog);
	const accessToken = useSelector((state) => state.auth.accessToken);
	const user = useSelector((state) => state.auth.user);
	const application = useSelector((state) => state.applications.application);

	const handleSubmit = (event) => {
		event.preventDefault();
		const applicationID = application.id;
		dispatch(deleteApplication(applicationID, accessToken));
		dispatch(toggleApplicationDeleteDialog());
		dispatch(getAllApplications(accessToken, user));
	};

	const id = `DeleteDialogDegreeCourseApplication${application.id}`;
	return (
		<Modal id={id} show={showDeleteDialog} onHide={() => dispatch(toggleApplicationDeleteDialog())}>
			<Modal.Header closeButton>
				<Modal.Title>Delete User</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mt-3'>
						<Form.Label>Application ID:</Form.Label>
						<Form.Control name='userID' type='text' defaultValue={application.id} disabled />
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Applicant User-ID:</Form.Label>
						<Form.Control name='userID' type='text' defaultValue={application.applicantUserID} disabled />
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>University Name:</Form.Label>
						<Form.Control name='userID' type='text' defaultValue={application.universityName} disabled />
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>University Short Name:</Form.Label>
						<Form.Control name='userID' type='text' defaultValue={application.universityShortName} disabled />
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Degree Course Name:</Form.Label>
						<Form.Control name='userID' type='text' defaultValue={application.degreeCourseName} disabled />
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Target Period Year:</Form.Label>
						<Form.Control name='userID' type='text' defaultValue={application.targetPeriodYear} disabled />
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Target Period Short Name:</Form.Label>
						<Form.Control name='userID' type='text' defaultValue={application.targetPeriodShortName} disabled />
					</Form.Group>
					<Button className='m-3' id='DeleteDialogConfirmButton' variant='danger' type='submit'>
						Delete User
					</Button>
					<Button className='m-3' id='DeleteDialogCancelButton' variant='secondary' onClick={() => dispatch(toggleApplicationDeleteDialog())}>
						Cancel
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default DeleteApplicationModal;
