import Carousel from 'react-bootstrap/Carousel';
import styles from '../../css/Home/HomeCar.module.css'

function HomeCarousel() {
  return (
    <Carousel data-bs-theme="light">
      <Carousel.Item>
        <div className={styles.carousel_body}>
            <div className={styles.carousel_img1}>
            </div>
            <div className={styles.carousel_text}>
                <div>
                    <div className={styles.slideTextOne}>Partner with us in our attempt to change the world.</div>
                    <div className={styles.slideTextTwo}>Register your NGO today.</div>
                </div>
                <form className={styles.button}>
                    <button className='btn btn-lg' type='submit' id={styles.carousel_button}>Get Started</button>
                </form>
            </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className={styles.carousel_body}>
            <div className={styles.carousel_img2}>
            </div>
            <div className={styles.carousel_text}>
                <div>
                    <div className={styles.slideTextOne}>Your Extra Food is Someone's Daily Meal.</div>
                    <div className={styles.slideTextTwo}>Join Us Now!</div>
                </div>
                <form className={styles.button}>
                    <button className='btn btn-lg' type='submit' id={styles.carousel_button}>Donate Now</button>
                </form>
            </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
