import Carousel from 'react-bootstrap/Carousel';
import './CSS files/homecar.css'

function HomeCarousel() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <div className='carousel_body'>
            <div className='carousel_img1'>
            </div>
            <div className='carousel_text'>
                <div>
                    <div className='slideTextOne'>Partner with us in our attempt to change the world.</div>
                    <div className='slideTextTwo'>Register your NGO today.</div>
                </div>
                <form className='button'>
                    <button className='btn btn-lg' type='submit' id='carousel_button'>Get Started</button>
                </form>
            </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='carousel_body'>
            <div className='carousel_img2'>
              {/* <img src={img2}></img> */}
            </div>
            <div className='carousel_text'>
                <div>
                    <div className='slideTextOne'>Your Extra Food is Someone's Daily Meal.</div>
                    <div className='slideTextTwo'>Join Us Now!</div>
                </div>
                <form className='button'>
                    <button className='btn btn-lg' type='submit' id='carousel_button'>Donate Now</button>
                </form>
            </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;