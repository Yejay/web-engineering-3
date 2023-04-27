import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import UserSessionWidget from './UserSessionWidget';
import { LinkContainer } from 'react-router-bootstrap';
import { FaUserEdit, FaUniversity, FaMailBulk } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';

function TopMenu() {
	const user = useSelector((state) => state.auth.user);
	return (
		<Navbar style={{ height: '4rem' }} sticky='top' collapseOnSelect expand='lg' bg='dark' variant='dark'>
			<Container fluid>
				<LinkContainer to='/'>
					<Navbar.Brand>
						<Badge bg='light'>
							<img height='40' src={require('../../../img/BHT_Logos_PNG/BHT_PNG_hoehe-100pix/BHT_Logo_kompakt_horizontal_Anthrazit_RGB_h100pix.png')} alt='First slide' />
						</Badge>
					</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav variant='tabs' className='me-auto custom-nav-padding'>
						<LinkContainer to='/' id='OpenStartPageButton'>
							<Nav.Link>
								<Button size='lg' variant='dark' className='nav-button'>
									<AiFillHome size={28} className='nav-button-icon' />
								</Button>
							</Nav.Link>
						</LinkContainer>
						{user && user.isAdministrator ? (
							<LinkContainer to='/userManagement' id='OpenUserManagementPageButton'>
								<Nav.Link>
									<Button size='lg' variant='dark'>
										<FaUserEdit size={28} />
									</Button>
								</Nav.Link>
							</LinkContainer>
						) : null}
						{user ? (
							<LinkContainer to='/degreeCourseManagement' id='OpenDegreeCourseManagementPageButton'>
								<Nav.Link>
									<Button size='lg' variant='dark'>
										<FaUniversity size={28} />
									</Button>
								</Nav.Link>
							</LinkContainer>
						) : null}
						{user ? (
							<LinkContainer to='/applicationManagement' id='OpenDegreeCourseApplicationManagementPageButton'>
								<Nav.Link>
									<Button size='lg' variant='dark'>
										<FaMailBulk size={28} />
									</Button>
								</Nav.Link>
							</LinkContainer>
						) : null}
					</Nav>
					{user ? (
						<Navbar.Text style={{ padding: '10px' }}>
							Signed in as: <b>{user.userID}</b>
						</Navbar.Text>
					) : null}
					<Nav>
						<UserSessionWidget id='OpenLoginDialogButton' eventKey={2} href='#memes'></UserSessionWidget>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default TopMenu;
