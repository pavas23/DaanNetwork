import HomeNav from '../Home/HomeNav'
import DonationForm from './DonationForm';
import styles from '../../css/Donor/Donor.module.css'

function Donor() {
    return (
        <div>
            <HomeNav />
            <div className={styles["flex-container"]}>
                <div className={styles["flex-child-image"]}>
                </div>
                <div className={styles["flex-child-form"]}>
                    <DonationForm />
                </div>
            </div>
        </div>
    );
}

export default Donor;