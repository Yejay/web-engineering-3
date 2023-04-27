import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import { updateDegree, getAllDegrees } from '../state/degrees';
import { toggleEditDialog } from '../state/degreesSlice';
import { useEffect } from 'react';

function UpdateDegreeModal() {
	const dispatch = useDispatch();
	const showEditDialog = useSelector((state) => state.degrees.showEditDialog);
	const accessToken = useSelector((state) => state.auth.accessToken);
	const degree = useSelector((state) => state.degrees.degree);

	const [universityName, setUniversityName] = useState(degree.universityName);
	const [universityShortName, setUniversityShortName] = useState(degree.universityShortName);
	const [departmentName, setDepartmentName] = useState(degree.departmentName);
	const [departmentShortName, setDepartmentShortName] = useState(degree.departmentShortName);
	const [name, setName] = useState(degree.name);
	const [shortName, setShortName] = useState(degree.shortName);

	useEffect(() => {
		if (!showEditDialog) {
			setUniversityName('');
			setUniversityShortName('');
			setDepartmentName('');
			setDepartmentShortName('');
			setName('');
			setShortName('');
		}
	}, [showEditDialog]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const degreeID = degree.id;
		const newDegree = {
			universityName: universityName || degree.universityName,
			universityShortName: universityShortName || degree.universityShortName,
			departmentName: departmentName || degree.departmentName,
			departmentShortName: departmentShortName || degree.departmentShortName,
			name: name || degree.name,
			shortName: shortName || degree.shortName,
		};
		dispatch(updateDegree(degreeID, newDegree, accessToken));
		dispatch(toggleEditDialog());
		dispatch(getAllDegrees(accessToken));
	};

	return (
		<Modal
			id='DegreeCourseManagementPageEditComponent'
			show={showEditDialog}
			onHide={() => {
				dispatch(toggleEditDialog());
			}}
		>
			<Modal.Header closeButton>
				<Modal.Title>Edit Degree Course</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mt-3'>
						<Form.Label>Degree Course ID:</Form.Label>
						<Form.Control id='EditDegreeCourseComponentEditDegreeCourseID' name='degreeCourseID' type='text' value={degree.id} disabled />
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>University Name</Form.Label>
						<Form.Control
							id='EditDegreeCourseComponentEditUniversityName'
							name='universityName'
							type='text'
							placeholder='Enter University Name'
							defaultValue={degree.universityName}
							onChange={(e) => setUniversityName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>University Short Name</Form.Label>
						<Form.Control
							id='EditDegreeCourseComponentEditUniversityShortName'
							name='universityShortName'
							type='text'
							placeholder='Enter University Short Name'
							defaultValue={degree.universityShortName}
							onChange={(e) => setUniversityShortName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Department Name:</Form.Label>
						<Form.Control
							id='EditDegreeCourseComponentEditDepartmentName'
							name='departmentName'
							type='text'
							placeholder='Enter Department Name'
							defaultValue={degree.departmentName}
							onChange={(e) => setDepartmentName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Department Short Name:</Form.Label>
						<Form.Control
							id='EditDegreeCourseComponentEditDepartmentShortName'
							name='departmentShortName'
							type='text'
							placeholder='Enter Department Short Name'
							defaultValue={degree.departmentShortName}
							onChange={(event) => setDepartmentShortName(event.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Degree Course Name:</Form.Label>
						<Form.Control
							id='EditDegreeCourseComponentEditName'
							name='degreeCourseName'
							type='text'
							placeholder='Enter Degree Course Name'
							defaultValue={degree.name}
							onChange={(event) => setName(event.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Degree Course Short Name:</Form.Label>
						<Form.Control
							id='EditDegreeCourseComponentEditShortName'
							name='degreeCourseShortName'
							type='text'
							placeholder='Enter Degree Course Short Name'
							defaultValue={degree.shortName}
							onChange={(event) => setShortName(event.target.value)}
						/>
					</Form.Group>
					<Button className='m-3' id='EditDegreeCourseComponentSaveDegreeCourseButton' variant='success' type='submit'>
						Save Changes
					</Button>
					<Button className='m-3' id='OpenDegreeCourseManagementPageListComponentButton' variant='secondary' onClick={() => dispatch(toggleEditDialog())}>
						Cancel
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default UpdateDegreeModal;
