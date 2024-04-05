import React, { useState } from "react";
import styles from "../../css/Donor/DonorLogin.module.css";

const DonorResetPassword = () => {
  const initialValues = {
    newpswd: "",
    checkpswd: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(formValues));
    setIsSubmit(true);
  };

  const validateForm = (values) => {
    const errors = {};
    for (let item in values) {
      if (!values[item]) {
        errors["error"] = "Please fill out all the required details!";
        return errors;
      }
    }
    if (values.newpswd.length < 8) {
      errors["error"] = "Password should be of minimum 8 characters!";
    } else if (values.newpswd != values.checkpswd) {
      errors["error"] = "Re-entered password does not match the new password!";
    }
    return errors;
  };

  return (
    <div className={styles.background_box}>
      <div className={styles.login_box}>
        <div className={styles.login_title}>Reset Password</div>
        <form onSubmit={handleSubmit}>
          <div className={styles.login_form}>
            <div className={styles.row}>
              <div className={styles.login_text}>Enter New Password</div>
              <div className={styles.login_input_element}>
                <input
                  type="Password"
                  name="newpswd"
                  className={styles.login_input}
                  value={formValues.newpswd}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.login_text}>Re Enter New Password</div>
              <div className={styles.login_input_element}>
                <input
                  type="Password"
                  name="checkpswd"
                  className={styles.login_input}
                  value={formValues.checkpswd}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <p className={styles.errormessage}>{formErrors.error}</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" className={styles.submit_btn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonorResetPassword;
