import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

function BasicCarousel() {
	return (
		<Container fluid style={{ backgroundColor: '#3d1f3d', padding: '10px' }}>
			<Carousel style={{ backgroundColor: 'white' }}>
				<Carousel.Item>
					<img className='d-block h-50 w-100 align-center' src={require('../../../img/uni1.jpg')} alt='First slide' />
					<Carousel.Caption>
						<h3>Class of 2022</h3>
						<p>Our 2022 alumni, who attended a variety of different degree courses.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img className='d-block w-100 align-center' src={require('../../../img/uni2.jpg')} alt='Second slide' />

					<Carousel.Caption>
						<h3>Main building</h3>
						<p>The main building of our university, located at the heart of our campus.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img className='d-block w-100 align-center' src={require('../../../img/uni3.jpg')} alt='Third slide' />

					<Carousel.Caption>
						<h3>Rooftop view of our campus</h3>
						<p>This picture was taken from one of our three rooftop Cafés.</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		</Container>
	);
}

export default BasicCarousel;
