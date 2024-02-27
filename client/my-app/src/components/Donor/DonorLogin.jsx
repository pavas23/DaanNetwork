import styles from "../../css/Donor/DonorLogin.module.css"
import React, { useState } from "react";

const DonorLogin = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setFormErrors(validateForm(formValues));
    setIsSubmit(true);
  };

  return (
    <div className={styles.background_box}>
      <div className={styles.login_box}>
        <div className={styles.login_title}>Donor Login</div>
        <form onSubmit={handleSubmit}>
          <div className={styles.login_form}>
            <div className={styles.row}>
              <div className={styles.login_text}>Email :</div>
              <div className={styles.login_input_element}>
                <input
                  type="text"
                  name="email"
                  className={styles.login_input}
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.login_text}>Password :</div>
              <div className={styles.login_input_element}>
                <input
                  type="Password"
                  name="password"
                  className={styles.login_input}
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <p className={styles.errormessage}>{formErrors.error}</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" className={styles.submit_btn}>
              Login
            </button>
          </div>
          <div className={styles.row}>
            <div className={styles.login_text}>Don't have an account?</div>
            <div>
              <a href="#">Create New Account</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonorLogin;
