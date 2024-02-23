import HomeNav from '../Home/HomeNav'
import DonationForm from './DonationForm';
import styles from '../../css/Donor/Donor.module.css'
import img1 from '../../images/food-donor.png'

function Donor() {
    return (
        <div>
            <HomeNav />
            <img src={img1} alt="Donor-Food" className={styles["donor-img"]} />
            <div className={styles["flex-container"]}>
                <div className={styles["flex-child-form"]}>
                    <DonationForm />
                </div>
                <div className={styles["flex-child-text"]}>
                    <p>
                        In order to make an offline donation we ask that you please follow these instructions:
                    </p>
                    <ol>
                        <li>Make a check payable to "Charite"</li>
                        <li>On the memo line of the check, please indicate that the donation is for "Charite"</li>
                        <li>Please mail your check to:<br />
                            Chariti 111 Not A Real St. Anytown, CA 12345
                        </li>
                        <li>Email us in details: <a href="mailto:donation@chareti.org">donation@chareti.org</a></li>
                        <li>Contact us at Phone: <a href="tel:+911141716555">+91-11-41716555</a>, Mob: <a href="tel:+918130088239">+91 8130088239</a></li>
                    </ol>
                    <p>All contributions will be gratefully acknowledged and are tax deductible.</p>
                </div>
            </div>
        </div>
    );
}

export default Donor;