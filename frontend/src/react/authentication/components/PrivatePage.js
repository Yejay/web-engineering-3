import React from 'react';
import { Container } from 'react-bootstrap';
import TopMenu from './TopMenu';
import BasicCarousel from '../../content/components/BasicCarousel';
import { Card, CardGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const PrivatePage = () => {
	const user = useSelector((state) => state.auth.user);

	return (
		<div id='StartPage' className='landing-page'>
			<TopMenu />
			<Container className='jumbotron'>
				<div className='spacer' style={{ height: '30px', width: '100%' }}></div>
				<h1 className='display-1'>
					Welcome to
					<img src={require('../../../img/BHT_Logos_PNG/BHT_PNG_144ppi/BHT_Logo_horizontal_Negativ_RGB_144ppi.png')} alt='bht logo' />
					{user && user.userID && user.userID.toUpperCase()}
					{/* {user && user.user && user.user.toUpperCase()} */}
				</h1>
				<p className='lead'>We are a leading institution in the field of higher education, offering a wide range of degree programs for students to choose from.</p>
				<hr className='my-4' />
				<BasicCarousel />
				<div className='spacer' style={{ height: '30px', width: '100%' }}></div>
				<p className='display-4'>These topics might interest you:</p>
				<CardGroup>
					<Card bg='dark' text='light'>
						<Card.Body>
							<Card.Title className='display-6'>Dev Ops</Card.Title>
							<div style={{ backgroundColor: 'white' }}>
								<Card.Img variant='top' src={require('../../../img/devops.png')} />
							</div>
							<hr className='my-4' />
							<Card.Text className='lead'>
								DevOps is a software development approach that combines software development (Dev) and IT operations (Ops) to shorten the systems development life cycle while
								delivering features, fixes, and updates frequently in close alignment with business objectives. It emphasizes communication, collaboration and integration between
								software developers and IT professionals.
							</Card.Text>
						</Card.Body>
						<Card.Footer>
							<small className='text-muted'>Last updated 3 mins ago</small>
						</Card.Footer>
					</Card>
					<Card bg='dark' text='light'>
						<Card.Body>
							<Card.Title className='display-6'>Web Engineering</Card.Title>
							<div style={{ backgroundColor: 'white' }}>
								<Card.Img variant='top' src={require('../../../img/webeng.png')} />
							</div>
							<hr className='my-4' />
							<Card.Text className='lead'>
								Web Engineering is a discipline that deals with the design and development of web-based systems and applications. This field combines the principles of software
								engineering with the unique characteristics of the web to create robust and maintainable web systems. It includes web design, web development, web testing, web
								security, web performance, and web maintenance.
							</Card.Text>
						</Card.Body>
						<Card.Footer>
							<small className='text-muted'>Last updated 10 mins ago</small>
						</Card.Footer>
					</Card>
					<Card bg='dark' text='light'>
						<Card.Body>
							<Card.Title className='display-6'>Software Engineering</Card.Title>
							<div style={{ backgroundColor: 'white' }}>
								<Card.Img className='d-block w-100 align-center' variant='top' src={require('../../../img/softeng.png')} />
							</div>
							<hr className='my-4' />
							<Card.Text className='lead'>
								Software Engineering is the process of designing, creating, testing, and maintaining software. It is a systematic and disciplined approach to software development.
								Software Engineers use a set of methods, techniques, and tools to create high-quality software that is reliable, efficient, and easy to maintain. They work with a team
								of developers and stakeholders to design, implement, test, and deploy software systems, and to continuously improve the software development process.
							</Card.Text>
						</Card.Body>
						<Card.Footer>
							<small className='text-muted'>Last updated 7 mins ago</small>
						</Card.Footer>
					</Card>
				</CardGroup>
				<div className='spacer' style={{ height: '30px', width: '100%' }}></div>
				<hr className='my-2' />
			</Container>
			<Container className='footer'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-4'>
							<h4 className='display-7'>Contact Us</h4>
							<p className='lead'>Address: 1234 Main Street</p>
							<p className='lead'>Phone: 555-555-5555</p>
							<p className='lead'>Email: info@yourwebsite.com</p>
						</div>
						<div className='col-md-4'>
							<h4 className='display-7'>Course Information</h4>
							<p className='lead'>Web Engineering 2</p>
							<p className='lead'>Course led by Prof. Dr. Sebastian von Klinski</p>
							<p className='lead'>Teaching the advanced technologies of web engineering</p>
						</div>
						<div className='col-md-4'>
							<h4 className='display-7'>About Us</h4>
							<p className='lead'>This is a university project</p>
							<p className='lead'>Based of react, redux-toolkit and many other technologies</p>
						</div>
					</div>
				</div>
				<div className='copyright'>
					<p className='lead'>Copyright ©2023 Yejay Demirkan</p>
				</div>
			</Container>
		</div>
	);
};

export default PrivatePage;
