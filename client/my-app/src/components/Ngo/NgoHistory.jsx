import NgoNav from "./NgoNav";
import styles from "../../css/Ngo/NgoHistory.module.css";

const NgoHistory = () => {
  return (
    <div>
      <NgoNav />
      <div>
        <div className={styles.header1}>
          <h2>Accepted Donations</h2>
        </div>
        <div className={styles.header2}>
          <h2>Past held Donation Drives</h2>
        </div>
      </div>
    </div>
  );
};

export default NgoHistory;
