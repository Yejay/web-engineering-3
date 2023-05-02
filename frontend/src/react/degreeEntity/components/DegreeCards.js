import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { toggleDeleteDialog, toggleEditDialog } from '../state/degreesSlice';
import { toggleApplicationCreateDialog } from '../../applicationEntity/state/applicationsSlice';
import { getAllDegrees } from '../state/degrees';

function DegreeCards() {
	const dispatch = useDispatch();
	const degrees = useSelector((state) => state.degrees.degrees);
	const user = useSelector((state) => state.auth.user);
	const accessToken = useSelector((state) => state.auth.accessToken);
	const showCreateDialog = useSelector((state) => state.degrees.showCreateDialog);

	useEffect(() => {
		if (accessToken) dispatch(getAllDegrees(accessToken));
	}, [accessToken, dispatch]);

	let dynamicID;
	if (showCreateDialog) {
		dynamicID = '';
	} else {
		dynamicID = 'DegreeCourseManagementPageListComponent';
	}

	return (
		<div id={dynamicID} className='d-flex flex-wrap'>
			{degrees &&
				degrees.map((degree) => {
					// Web 2
					// const createApplicationId = `CreateDegreeCourseApplicationForDegreeCourse${degree.id}`;
					// const editButtonId = `DegreeCourseItemEditButton${degree.id}`;
					// const deleteButtonId = `DegreeCourseItemDeleteButton${degree.id}`;
					// const id = `DegreeCourseItem${degree.id}`;

					// Web 3
					const createApplicationId = `CreateDegreeCourseApplicationForDegreeCourse${degree.shortName}`;
					const editButtonId = `DegreeCourseItemEditButton${degree.shortName}`;
					const deleteButtonId = `DegreeCourseItemDeleteButton${degree.shortName}`;
					const id = `DegreeCourseItem${degree.shortName}`;
					return (
						<Card id={id} bg='dark' border='secondary' text='light' className='m-2 degree-cards' style={{ width: '26.75rem' }} key={degree.id}>
							<Card.Body>
								<Card.Title>
									<b>
										<u>Degree Course Info Card:</u>
									</b>
								</Card.Title>
								<Card.Text id='UniversityName'>
									<b>University:</b> {degree.universityName}
								</Card.Text>
								<Card.Text id='UniversityShortName'>
									<b>University Short Name:</b> {degree.universityShortName}
								</Card.Text>
								<Card.Text id='DepartmentName'>
									<b>Department Name:</b> {degree.departmentName}
								</Card.Text>
								<Card.Text id='DepartmentShortName'>
									<b>Department Short Name:</b> {degree.departmentShortName}
								</Card.Text>
								<Card.Text id='Name'>
									<b>Degree Course Name:</b> {degree.name}
								</Card.Text>
								<Card.Text id='ShortName'>
									<b>Degree Course Short Name:</b> {degree.shortName}
								</Card.Text>
							</Card.Body>
							<Button id={createApplicationId} className='m-2' variant='outline-success' onClick={() => dispatch(toggleApplicationCreateDialog({ degree }))}>
								<b>Create Application</b>
							</Button>
							{user.isAdministrator ? (
								<Button id={editButtonId} className='m-2' variant='outline-warning' onClick={() => dispatch(toggleEditDialog({ degree }))}>
									<b>Edit</b>
								</Button>
							) : null}
							{user.isAdministrator ? (
								<Button id={deleteButtonId} className='m-2' variant='outline-danger' onClick={() => dispatch(toggleDeleteDialog({ degree }))}>
									<b>Delete</b>
								</Button>
							) : null}
						</Card>
					);
				})}
		</div>
	);
}

export default DegreeCards;
