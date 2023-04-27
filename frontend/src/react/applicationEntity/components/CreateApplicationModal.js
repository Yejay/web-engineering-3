import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import { createApplication } from '../state/applications';
import { getAllDegrees } from '../../degreeEntity/state/degrees';
import { toggleApplicationCreateDialog } from '../state/applicationsSlice';

function CreateApplicationModal() {
	const dispatch = useDispatch();
	const showCreateDialog = useSelector((state) => state.applications.showCreateDialog);
	const accessToken = useSelector((state) => state.auth.accessToken);
	const applicationDegree = useSelector((state) => state.applications.applicationDegree);
	const user = useSelector((state) => state.auth.user);

	const [applicantUserID, setApplicantUserID] = useState(undefined);
	const degreeCourseID = applicationDegree.id;
	const [targetPeriodYear, setTargetPeriodYear] = useState('');
	const [targetPeriodShortName, setTargetPeriodShortName] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		let newApplication;
		if (user.isAdministrator) {
			newApplication = { applicantUserID, degreeCourseID, targetPeriodYear, targetPeriodShortName };
		} else {
			newApplication = { degreeCourseID, targetPeriodYear, targetPeriodShortName };
		}
		dispatch(createApplication(newApplication, accessToken));
		dispatch(toggleApplicationCreateDialog());
		dispatch(getAllDegrees(accessToken));
	};

	return (
		<Modal
			id='DegreeCourseApplicationManagementPageCreateComponent'
			show={showCreateDialog}
			onHide={() => {
				dispatch(toggleApplicationCreateDialog());
			}}
		>
			<Modal.Header closeButton>
				<Modal.Title>Create New Application</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mt-3'>
						<Form.Label>Degree Course ID:</Form.Label>
						<Form.Control name='degreeCourseName' type='text' defaultValue={applicationDegree.id} disabled />
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Degree Course Name:</Form.Label>
						<Form.Control name='degreeCourseName' type='text' defaultValue={applicationDegree.name} disabled />
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Applicant User Name:</Form.Label>
						<Form.Control
							id='CreateDegreeCourseApplicationEditUserID'
							name='userID'
							type='text'
							placeholder='Enter Applicant User Name'
							value={user.isAdministrator ? undefined : user.userID}
							onChange={(event) => setApplicantUserID(event.target.value)}
							disabled={!user.isAdministrator}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Target Period Year:</Form.Label>
						<Form.Control
							id='CreateDegreeCourseApplicationEditTargetPeriodYear'
							name='targetPeriodYear'
							type='text'
							placeholder='Enter Target Period Year'
							value={targetPeriodYear}
							onChange={(event) => setTargetPeriodYear(event.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Semester:</Form.Label>
						<Form.Control
							id='CreateDegreeCourseApplicationEditTargetPeriodName'
							as='select'
							name='targetPeriodShortName'
							aria-label='Default select example'
							onChange={(event) => setTargetPeriodShortName(event.target.value)}
						>
							<option>Please select a semester</option>
							<option>WiSe</option>
							<option>SoSe</option>
						</Form.Control>
					</Form.Group>
					<Button className='m-3' id='CreateDegreeCourseApplicationCreateButton' variant='primary' type='submit'>
						Create
					</Button>
					<Button className='m-3' id='OpenDegreeCourseManagementPageListComponentButton' variant='secondary' onClick={() => dispatch(toggleApplicationCreateDialog())}>
						Cancel
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default CreateApplicationModal;
