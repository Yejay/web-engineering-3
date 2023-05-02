import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { toggleApplicationDeleteDialog } from '../state/applicationsSlice';
import { getAllApplications } from '../state/applications';

function ApplicationCards() {
	const applications = useSelector((state) => state.applications.applications);
	const accessToken = useSelector((state) => state.auth.accessToken);
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (accessToken) dispatch(getAllApplications(accessToken, user));
	}, [accessToken, user, dispatch]);

	return (
		<div id='DegreeCourseApplicationManagementPageListComponent' className='d-flex flex-wrap'>
			{applications &&
				applications.map((application) => {
					// Web 2
					// const deleteButtonId = `DegreeCourseApplicationItemDeleteButton${application.id}`;
					// const id = `DegreeCourseApplicationItem${application.id}`;

					// Web 3
					const deleteButtonId = `DegreeCourseApplicationItemDeleteButton${application.applicantUserID + application.degreeCourseShortName + application.targetPeriodYear}`;
					const id = `DegreeCourseApplicationItem${application.applicantUserID + application.degreeCourseShortName + application.targetPeriodYear}`;
					return (
						<Card id={id} bg='dark' border='secondary' text='light' className='m-2 application-cards' style={{ width: '26.75rem' }} key={application.id}>
							<Card.Body>
								<Card.Title>
									<b>
										<u>Application Info Card:</u>
									</b>
								</Card.Title>
								<Card.Text>
									<b>Application ID:</b> {application.id}
								</Card.Text>
								<Card.Text id='ApplicantUserID'>
									<b>Applicant User-ID:</b> {application.applicantUserID}
								</Card.Text>
								<Card.Text id='UniversityName'>
									<b>University Name:</b> {application.universityName}
								</Card.Text>
								<Card.Text id='UniversityShortName'>
									<b>University Short Name:</b> {application.universityShortName}
								</Card.Text>
								<Card.Text id='DegreeCourseName'>
									<b>Degree Course Name:</b> {application.degreeCourseName}
								</Card.Text>
								<Card.Text id='DegreeCourseShortName'>
									<b>Degree Course Short Name:</b> {application.degreeCourseShortName}
								</Card.Text>
								<Card.Text id='TargetPeriodYear'>
									<b>Target Period Year:</b> {application.targetPeriodYear}
								</Card.Text>
								<Card.Text id='TargetPeriodShortName'>
									<b>Target Period Short Name:</b> {application.targetPeriodShortName}
								</Card.Text>
							</Card.Body>
							{user.isAdministrator ? (
								<Button id={deleteButtonId} className='m-2' variant='danger' onClick={() => dispatch(toggleApplicationDeleteDialog({ application }))}>
									Delete
								</Button>
							) : null}
						</Card>
					);
				})}
		</div>
	);
}

export default ApplicationCards;
