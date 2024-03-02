import NgoNav from './NgoNav';
import NgoDonationsAcceptedView from './NgoDonationsAcceptedView';
import NgoHistoryDrivesView from './NgoHistoryDrivesView';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from '../../css/Ngo/NgoHistory.module.css';


const NgoHistory = () => {
    
    return (
        <div>
            <NgoNav />
            <div>
                <div>
                    <NgoDonationsAcceptedView/>
                </div>
                <div className={styles.line}></div>
                <div>
                    <NgoHistoryDrivesView/>
                </div>
            </div>
        </div>
    );
}

export default NgoHistory;