import styles from "../../css/Donor/DonorSignup.module.css";
import React, { useState, useEffect } from "react";

function DonorSignup() {
  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear() - 18;
  var currDate = year + "-" + month + "-" + day;
  var validDate = new Date(currDate);

  const initialValues = {
    donor_name: "",
    phone: "",
    alt_phone: "",
    email: "",
    password: "",
    chk_password: "",
    birthdate: "",
    gender: "Male",
    address1: "",
    address2: "",
    state: "",
    city: "",
    zip: "",
    nationality: "indian",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({ error: " " });
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    submitRequest();
  }, [formErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm(formValues));
  };

  const submitRequest = async () => {
    if (formErrors.error === "") {
      var res = await fetch(`${REACT_APP_APIURL}/donor/add-donor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formValues.donor_name,
          phone: formValues.phone,
          alt_phone: formValues.alt_phone,
          emailId: formValues.email,
          birthdate: formValues.birthdate,
          address: formValues.address1 + ", " + formValues.address2,
          gender: formValues.gender,
          password: formValues.password,
          city: formValues.city,
          state: formValues.state,
          zip_code: formValues.zip,
          nationality: formValues.nationality,
        }),
      });
      res = await res.json();
      if (!res.status) {
        setFormErrors({ error: res.desc });
      } else {
        setFormValues(initialValues);
      }
    }
  };

  const validateForm = (values) => {
    const errors = { error: "" };
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/i;
    const bday = new Date(values.birthdate);
    for (let item in values) {
      if (!values[item] && item !== "alt_phone") {
        errors["error"] = "Please fill out all the required details!";
        return errors;
      }
    }
    if (!regex.test(values.email)) {
      errors["error"] = "Please enter a valid email address!";
    } else if (bday > validDate) {
      errors["error"] = "You should be over the age of 18!";
    } else if (values.password.length < 8) {
      errors["error"] = "Password should be of minimum 8 characters!";
    } else if (values.chk_password != values.password) {
      errors["error"] = "Re-entered password does not match the new password!";
    } else if (values.phone.length !== 10 || isNaN(values.phone)) {
      errors["error"] = "Please enter a valid contact number!";
    } else if (values.alt_phone == "") {
      return errors;
    } else if (values.alt_phone.length !== 10 || isNaN(values.alt_phone)) {
      errors["error"] = "Please enter a valid contact number!";
    } else if (values.alt_phone === values.phone) {
      errors["error"] = "Please enter different alternative phone number!";
    }
    return errors;
  };

  return (
    <div className={styles.background_box}>
      <div className={styles.signup_box}>
        <div className={styles.signup_title}>Donor Sign-Up</div>
        <form onSubmit={handleSubmit}>
          <div className={styles.signup_form}>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                Full Name:<span style={{ color: "red" }}>*</span>{" "}
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="text"
                  name="donor_name"
                  className={styles.signup_input}
                  value={formValues.donor_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                Gender:<span style={{ color: "red" }}>*</span>{" "}
              </div>
              <div className={styles.signup_input_element}>
                <select
                  name="gender"
                  className={styles.signup_select}
                  value={formValues.gender}
                  onChange={handleChange}
                  defaultValue=""
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                Phone Number:<span style={{ color: "red" }}>*</span>
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="text"
                  name="phone"
                  className={styles.signup_input}
                  value={formValues.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                Alternative Phone Number:{" "}
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="text"
                  name="alt_phone"
                  className={styles.signup_input}
                  value={formValues.alt_phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                Email:<span style={{ color: "red" }}>*</span>{" "}
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="text"
                  name="email"
                  className={styles.signup_input}
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                Birth Date: <span style={{ color: "red" }}>*</span>
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="date"
                  name="birthdate"
                  className={styles.date_select}
                  value={formValues.birthdate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                Create Password (Minimum 8 characters):
                <span style={{ color: "red" }}>*</span>{" "}
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="Password"
                  name="password"
                  className={styles.signup_input}
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                Re-enter Password:<span style={{ color: "red" }}>*</span>{" "}
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="Password"
                  name="chk_password"
                  className={styles.signup_input}
                  value={formValues.chk_password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                Address Line 1: <span style={{ color: "red" }}>*</span>
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="text"
                  name="address1"
                  className={styles.signup_input}
                  value={formValues.address1}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                Address Line 2: <span style={{ color: "red" }}>*</span>
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="text"
                  name="address2"
                  className={styles.signup_input}
                  value={formValues.address2}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                City: <span style={{ color: "red" }}>*</span>
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="text"
                  name="city"
                  className={styles.signup_input}
                  value={formValues.city}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                State:<span style={{ color: "red" }}>*</span>{" "}
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="text"
                  name="state"
                  className={styles.signup_input}
                  value={formValues.state}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                Zip code: <span style={{ color: "red" }}>*</span>
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="text"
                  name="zip"
                  className={styles.signup_input}
                  value={formValues.zip}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                Nationality:<span style={{ color: "red" }}>*</span>{" "}
              </div>
              <div className={styles.signup_input_element}>
                <select
                  name="nationality"
                  className={styles.signup_select}
                  value={formValues.nationality}
                  onChange={handleChange}
                  defaultValue=""
                >
                  <option value="indian">Indian National</option>
                  <option value="foreign">Foreign National</option>
                  <option value="indianorigin">Person of Indian Origin</option>
                </select>
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
}

export default DonorSignup;
