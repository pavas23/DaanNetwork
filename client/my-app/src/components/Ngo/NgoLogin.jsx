import { Link } from "react-router-dom";
import styles from "../../css/Ngo/NgoLogin.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import swal from "sweetalert";

const NgoLogin = () => {
  let navigate = useNavigate();
  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

  const initialValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({ error: " " });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    submitRequest();
  }, [formErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(formValues));
  };

  const submitRequest = async () => {
    if (formErrors.error === "") {
      var res = await fetch(`${REACT_APP_APIURL}/ngo/ngo-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: formValues.email,
          password: formValues.password,
        }),
      });
      res = await res.json();
      if (!res.status) {
        setFormErrors({ error: res.desc });
      } else {
        localStorage.setItem("auth-token", res.token);
        navigate("/ngo-donations", { replace: true });
        setFormValues(initialValues);
      }
    }
  };

  const validateForm = (values) => {
    const errors = { error: "" };
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/i;
    if (values.email === "") {
      errors["error"] = "Please enter your Email Id";
    } else if (values.password === "") {
      errors["error"] = "Please enter your Password";
    } else if (!regex.test(values.email)) {
      errors["error"] = "Please enter a Valid Email Id";
    }
    return errors;
  };

  return (
    <div className={styles.background_box}>
      <div className={styles.login_box}>
        <div className={styles.login_title}>NGO Login</div>
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
          <p className={styles.errormessage} style={{ marginTop: "3%" }}>
            {formErrors.error}
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" className={styles.submit_btn}>
              Login
            </button>
          </div>
          <div className={styles.row} style={{ marginTop: "6%" }}>
            <div className={styles.login_text}>Don't have an account?</div>
            <div
              className={styles.login_input_element}
              style={{ textAlign: "right" }}
            >
              <Link to="/ngo-signup" style={{ color: "#0b7731" }}>
                Register with us!
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NgoLogin;
