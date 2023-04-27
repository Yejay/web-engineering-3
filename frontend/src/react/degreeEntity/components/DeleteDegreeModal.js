import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import { deleteDegree, getAllDegrees } from '../state/degrees';
import { toggleDeleteDialog } from '../state/degreesSlice';

function DeleteDegreeModal() {
	const dispatch = useDispatch();

	const showDeleteDialog = useSelector((state) => state.degrees.showDeleteDialog);
	const accessToken = useSelector((state) => state.auth.accessToken);
	const degree = useSelector((state) => state.degrees.degree);

	const handleSubmit = (event) => {
		event.preventDefault();
		const degreeID = degree.id;
		dispatch(deleteDegree(degreeID, accessToken));
		dispatch(toggleDeleteDialog());
		dispatch(getAllDegrees(accessToken));
	};

	const id = `DeleteDialogUser${degree.id}`;
	return (
		<Modal id={id} show={showDeleteDialog} onHide={() => dispatch(toggleDeleteDialog())}>
			<Modal.Header closeButton>
				<Modal.Title>Delete User</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mt-3'>
						<Form.Label>Degree Course ID:</Form.Label>
						<Form.Control name='userID' type='text' value={degree.id} disabled />
					</Form.Group>

					<Button className='m-3' id='DeleteDialogConfirmButton' variant='danger' type='submit'>
						Delete User
					</Button>
					<Button className='m-3' id='DeleteDialogCancelButton' variant='secondary' onClick={() => dispatch(toggleDeleteDialog())}>
						Cancel
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default DeleteDegreeModal;
