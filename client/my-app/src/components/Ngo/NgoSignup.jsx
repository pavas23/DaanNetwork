import styles from "../../css/Ngo/NgoSignup.module.css";
import React, { useEffect, useState } from "react";

function NGOsignup() {
  const initialValues = {
    ngo_name: "",
    ngo_pan: "",
    ngo_head: "",
    email: "",
    password: "",
    gender: "Male",
    contact: "",
    website: "",
    address: "",
    gst: "",
    reg_no: "",
    file: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({ error: " " });
  const [file, setFile] = useState();

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
      const formData = new FormData();
      formData.append("name", formValues.ngo_name);
      formData.append("panNumber", formValues.ngo_pan);
      formData.append("nameOfHead", formValues.ngo_head);
      formData.append("gender", formValues.gender);
      formData.append("emailId", formValues.email);
      formData.append("password", formValues.password);
      formData.append("contactNumber", formValues.contact);
      formData.append("website", formValues.website);
      formData.append("address", formValues.address);
      formData.append("gstnumber", formValues.gst);
      formData.append("regnumber", formValues.reg_no);
      formData.append("reg_certificate", file);
      var res = await fetch("http://localhost:5004/ngo/create-ngo", {
        method: "POST",
        body: formData,
      });
      res = await res.json();
      if (!res.status) {
        setFormErrors({ error: res.desc });
      } else {
        setFormValues(initialValues);
      }
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    formValues.file = e.target.files[0];
    setFile(e.target.files[0]);
  };

  const validateForm = (values) => {
    const errors = { error: "" };
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/i;
    if (values.file === "") {
      errors["error"] = "Please upload the registration certificate!";
      return errors;
    }
    for (let item in values) {
      if (
        !values[item] &&
        item !== "website" &&
        item !== "gst" &&
        item !== "file"
      ) {
        errors["error"] = "Please fill out all the required details!";
        return errors;
      }
    }
    if (!regex.test(values.email)) {
      errors["error"] = "Please enter a valid email address!";
    } else if (values.password.length < 8) {
      errors["error"] = "Password should be of minimum 8 characters!";
    } else if (values.contact.length !== 10 || isNaN(values.contact)) {
      errors["error"] = "Please enter a valid contact number!";
    }
    return errors;
  };

  return (
    <div className={styles.background_box}>
      <div className={styles.signup_box}>
        <div className={styles.signup_title}>NGO-Registration</div>
        <form
          method="POST"
          action="http://localhost:5004/ngo/create-ngo"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className={styles.signup_form}>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                Name of Applicant Organisation:
                <span style={{ color: "red" }}>*</span>{" "}
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="text"
                  name="ngo_name"
                  className={styles.signup_input}
                  value={formValues.ngo_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                PAN Number of Applicant Organization:
                <span style={{ color: "red" }}>*</span>
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="text"
                  name="ngo_pan"
                  className={styles.signup_input}
                  value={formValues.ngo_pan}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                Name of the Head of the Organisation:
                <span style={{ color: "red" }}>*</span>{" "}
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="text"
                  name="ngo_head"
                  className={styles.signup_input}
                  value={formValues.ngo_head}
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
                Email (used for sign in):<span style={{ color: "red" }}>*</span>{" "}
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
                Password:<span style={{ color: "red" }}>*</span>{" "}
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
                Contact Number:<span style={{ color: "red" }}>*</span>{" "}
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="text"
                  name="contact"
                  className={styles.signup_input}
                  value={formValues.contact}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>Website URL: </div>
              <div className={styles.signup_input_element}>
                <input
                  type="text"
                  name="website"
                  className={styles.signup_input}
                  value={formValues.website}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                Address:<span style={{ color: "red" }}>*</span>{" "}
              </div>
              <div className={styles.signup_input_element}>
                <textarea
                  style={{ fontFamily: "sans-serif" }}
                  type="text"
                  name="address"
                  maxLength="500"
                  className={styles.signup_textarea}
                  value={formValues.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                GST Number of the Organisation:{" "}
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="text"
                  name="gst"
                  className={styles.signup_input}
                  value={formValues.gst}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                Registration Number:<span style={{ color: "red" }}>*</span>{" "}
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="text"
                  name="reg_no"
                  className={styles.signup_input}
                  value={formValues.reg_no}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.signup_text}>
                Upload Registration Certificate for Verification: (pdf/jpg)
                <span style={{ color: "red" }}>*</span>{" "}
              </div>
              <div className={styles.signup_input_element}>
                <input
                  type="file"
                  name="reg_certificate"
                  className={styles.input_file}
                  onChange={handleUpload}
                  accept=".pdf,.jpg"
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
}

export default NGOsignup;
