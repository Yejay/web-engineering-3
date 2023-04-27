import TopMenu from './TopMenu';
import BasicCarousel from '../../content/components/BasicCarousel';
import React from 'react';
import { Container } from 'react-bootstrap';
import { Card, CardGroup } from 'react-bootstrap';

function LandingPage() {
	return (
		<div id='LandingPage' className='landing-page'>
			<TopMenu />
			<Container className='jumbotron'>
				<div className='spacer' style={{ height: '30px', width: '100%' }}></div>
				<h1 className='display-1'>
					Welcome to
					<img src={require('../../../img/BHT_Logos_PNG/BHT_PNG_144ppi/BHT_Logo_horizontal_Negativ_RGB_144ppi.png')} alt='bht logo' />
				</h1>
				<p className='lead'>We are a leading institution in the field of higher education, offering a wide range of degree programs for students to choose from.</p>
				<hr className='my-4' />

				<BasicCarousel />
				<div className='spacer' style={{ height: '30px', width: '100%' }}></div>
				<p className='display-4'>Some of our finest degree courses:</p>
				<CardGroup>
					<Card bg='dark' text='light'>
						<Card.Body>
							<Card.Title className='display-6'>Computer Science</Card.Title>
							<Card.Img variant='top' src={require('../../../img/comp.webp')} />
							<hr className='my-4' />
							<Card.Text className='lead'>
								The computer science program is a rapidly growing field that encompasses a wide range of topics including programming, algorithms, data structures, and artificial
								intelligence. Students will learn about computer systems, software development, and programming languages such as C++, Java and Python. They will also learn about the
								theoretical foundations of computing and the mathematical concepts that underlie computer science. The program includes courses in data structures, algorithms, computer
								networks, and databases. Students will also gain hands-on experience through programming projects and internships. Graduates will be prepared for careers in software
								development, data analysis, and artificial intelligence. They will be able to design, develop and implement software systems, work with big data, and develop algorithms
								to perform complex analysis. Computer science graduates will be equipped with the skills that are in high demand in industries such as technology, finance, and
								healthcare.
							</Card.Text>
						</Card.Body>
						<Card.Footer>
							<small className='text-muted'>Last updated 3 mins ago</small>
						</Card.Footer>
					</Card>
					<Card bg='dark' text='light'>
						<Card.Body>
							<Card.Title className='display-6'>Business Administration</Card.Title>
							<Card.Img variant='top' src={require('../../../img/buis.jpg')} />
							<hr className='my-4' />
							<Card.Text className='lead'>
								The business administration program is a broad field that provides students with a strong foundation in business management and leadership. Students will learn about
								accounting, finance, marketing, and operations management, as well as the strategic and ethical issues that businesses face. The program includes courses in financial
								and managerial accounting, business statistics, and organizational behavior. Students will also gain hands-on experience through case studies, business simulations, and
								internships. Graduates will be prepared for careers in various fields such as finance, marketing, human resources, and operations management. They will be able to
								analyze business problems, make strategic decisions, and effectively communicate with stakeholders. Additionally, business administration graduates will have the
								knowledge and skills to manage and lead teams, understand financial statements, and create financial projections. It also provides a strong foundation for those who
								wish to start their own business.
							</Card.Text>
						</Card.Body>
						<Card.Footer>
							<small className='text-muted'>Last updated 3 mins ago</small>
						</Card.Footer>
					</Card>
					<Card bg='dark' text='light'>
						<Card.Body>
							<Card.Title className='display-6'>Architecure</Card.Title>
							<Card.Img className='d-block w-100 align-center' variant='top' src={require('../../../img/arch.webp')} />
							<hr className='my-4' />
							<Card.Text className='lead'>
								The architecture program is a multi-disciplinary field that combines elements of art, science, and technology. Students will learn about building design, construction
								methods, and sustainability, as well as the history and theory of architecture. The program includes courses in architectural design, building systems, structures, and
								building codes. Students will also gain hands-on experience through studio classes and design projects. Graduates will be prepared for careers in architecture firms,
								urban planning, and building development. Additionally, Students will be able to design and plan sustainable buildings, analyze and solve environmental and social
								issues that come with the architecture, and be able to use advanced technology in architecture.
							</Card.Text>
						</Card.Body>
						<Card.Footer>
							<small className='text-muted'>Last updated 3 mins ago</small>
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
}

export default LandingPage;
