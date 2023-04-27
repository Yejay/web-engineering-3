import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import { createDegree } from '../state/degrees';
import { toggleCreateDialog } from '../state/degreesSlice';

function CreateDegreeModal() {
	const dispatch = useDispatch();
	const showCreateDialog = useSelector((state) => state.degrees.showCreateDialog);
	const accessToken = useSelector((state) => state.auth.accessToken);

	const [universityName, setUniversityName] = useState('');
	const [universityShortName, setUniversityShortName] = useState('');
	const [departmentName, setDepartmentName] = useState('');
	const [departmentShortName, setDepartmentShortName] = useState('');
	const [name, setName] = useState('');
	const [shortName, setShortName] = useState('');

	const resetForm = () => {
		setUniversityName('');
		setUniversityShortName('');
		setDepartmentName('');
		setDepartmentShortName('');
		setName('');
		setShortName('');
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const newDegree = { universityName, universityShortName, departmentName, departmentShortName, name, shortName };
		dispatch(createDegree(newDegree, accessToken));
		dispatch(toggleCreateDialog());
		resetForm();
	};

	return (
		<Modal
			id='DegreeCourseManagementPageCreateComponent'
			show={showCreateDialog}
			onHide={() => {
				dispatch(toggleCreateDialog());
				resetForm();
			}}
		>
			<Modal.Header closeButton>
				<Modal.Title>Create New Degree Course</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mt-3'>
						<Form.Label>University Name:</Form.Label>
						<Form.Control
							id='CreateDegreeCourseComponentEditUniversityName'
							name='universityName'
							type='text'
							placeholder='Enter University Name'
							value={universityName}
							onChange={(e) => setUniversityName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>University Short Name:</Form.Label>
						<Form.Control
							id='CreateDegreeCourseComponentEditUniversityShortName'
							name='universityShortName'
							type='text'
							placeholder='Enter University Short Name'
							value={universityShortName}
							onChange={(e) => setUniversityShortName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Department Name:</Form.Label>
						<Form.Control
							id='CreateDegreeCourseComponentEditDepartmentName'
							name='departmentName'
							type='text'
							placeholder='Enter Department Name'
							value={departmentName}
							onChange={(e) => setDepartmentName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Department Short Name:</Form.Label>
						<Form.Control
							id='CreateDegreeCourseComponentEditDepartmentShortName'
							name='departmentShortName'
							type='text'
							placeholder='Enter Department Short Name'
							value={departmentShortName}
							onChange={(e) => setDepartmentShortName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Degree Course Name:</Form.Label>
						<Form.Control
							id='CreateDegreeCourseComponentEditName'
							name='degreeCourseName'
							type='text'
							placeholder='Enter Degree Course Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Degree Course Short Name:</Form.Label>
						<Form.Control
							id='CreateDegreeCourseComponentEditShortName'
							name='degreeCourseShortName'
							type='text'
							placeholder='Enter Degree Course Short Name'
							value={shortName}
							onChange={(e) => setShortName(e.target.value)}
						/>
					</Form.Group>
					<Button className='m-3' id='CreateDegreeCourseComponentCreateDegreeCourseButton' variant='primary' type='submit'>
						Create
					</Button>
					<Button className='m-3' id='OpenDegreeCourseManagementPageListComponentButton' variant='secondary' onClick={() => dispatch(toggleCreateDialog())}>
						Cancel
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default CreateDegreeModal;
