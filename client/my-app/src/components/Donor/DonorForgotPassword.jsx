import React, { useState } from "react";
// import { useHistory } from 'react-router-dom';
import styles from "../../css/Donor/DonorLogin.module.css";

function DonorForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(12);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  // const history = useHistory();

  const handleSendOTP = async () => {
    try {
      const response = await fetch("/sendOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setOtp(data.otp);
    } catch (error) {
      setError("Failed to send OTP");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch("/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: verificationCode }),
      });
      const data = await response.json();
      // if (response.ok) {
      //   history.push('/reset-password');
      // } else {
      //   setError(data.message);
      // }
    } catch (error) {
      setError("Failed to verify OTP");
    }
  };

  return (
    <div className={styles.background_box}>
      <div className={styles.login_box}>
        <h2 className={styles.login_title}>Forgot Password</h2>
        <div className={styles.login_form}>
          <div className={styles.row}>
            <input
              type="email"
              className={styles.login_input_element}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <button onClick={handleSendOTP}>Send OTP</button>
          </div>
          <div className={styles.row}>
            {otp && (
              <>
                <input
                  type="text"
                  className={styles.login_input_element}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter OTP"
                />
                <button onClick={handleVerifyOTP}>Verify OTP</button>
              </>
            )}
          </div>
          {error && <p className={styles.errormessage}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default DonorForgotPassword;
