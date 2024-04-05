import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import profileImage from "../../images/profile-default.png";
import DonorNav from "./DonorNav";
import styles from "../../css/Donor/DonorProfile.module.css";
import { useNavigate } from "react-router";
import swal from "sweetalert";

const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

const DonorProfile = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/donor-login", { replace: true });
    } else {
      getData();
    }
  }, []);

  const getData = async () => {
    const response = await fetch(`${REACT_APP_APIURL}/donor/my-profile`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });

    const json = await response.json();
    if (!json.status) {
      if (json.desc == "Please authenticate using a valid token") {
        swal(
          "Could not fetch your profile details",
          "Invalid Session",
          "error"
        );
        localStorage.removeItem("auth-token");
        setTimeout(() => {
          navigate("/donor-login", { replace: true });
        }, 1500);
      } else {
        swal(
          "Could not fetch your profile details",
          `${json.desc} !!`,
          "error"
        );
      }
    } else {
      console.log(json.donor);
      setUserData(json.donor);
    }
  };

  // TODO
  const handleChange = (e) => {};

  // TODO
  const handleSubmit = (e) => {};

  const handleDeleteProfile = async () => {
    const response = await fetch(
      `${REACT_APP_APIURL}/donor/delete-my-profile`,
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      }
    );

    const json = await response.json();
    if (!json.status) {
      if (json.desc == "Please authenticate using a valid token") {
        swal("Could not delete your profile", "Invalid Session", "error");
        localStorage.removeItem("auth-token");
        setTimeout(() => {
          navigate("/donor-login", { replace: true });
        }, 1500);
      } else {
        swal("Could not delete your profile", `${json.desc} !!`, "error");
      }
    } else {
      swal("Delete", `${json.desc} !!`, "success");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    }
    setShowDeleteModal(false);
  };

  const getTopMargin = () => {
    // Check screen width and return appropriate top margin
    if (window.innerWidth <= 768) {
      return "5vh"; // Adjust the margin value for smaller screens
    } else {
      return "30vh"; // Default margin value
    }
  };

  return (
    <div>
      <DonorNav />
      <div className={styles.main_body}>
        <Container style={{ backgroundColor: "#fffff8" }}>
          <Row>
            <Col
              md={4}
              className="text-center"
              id="top-div"
              style={{
                marginTop: getTopMargin(),
              }}
            >
              <img
                src={profileImage}
                alt="Profile"
                className="img-fluid rounded-circle mb-3"
                style={{ width: "200px" }}
              />
              <h2>{userData.name}</h2>
              <p className="text-muted">{userData.email}</p>
            </Col>
            <Col
              md={8}
              style={{
                marginBottom: "20px",
              }}
            >
              <h1
                className="mb-4"
                style={{
                  textAlign: "center",
                }}
              >
                My Profile
              </h1>
              <Form onSubmit={handleSubmit} className={styles.form_container}>
                <Form.Group controlId="formName" className="mb-4">
                  <Form.Label className={styles.form_label}>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    disabled
                    style={{
                      backgroundColor:'white'
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-4">
                  <Form.Label className={styles.form_label}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={userData.emailId}
                    onChange={handleChange}
                    disabled
                    style={{
                      backgroundColor:'white'
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formPhone" className="mb-4">
                  <Form.Label className={styles.form_label}>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    disabled
                    style={{
                      backgroundColor:'white'
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formAlternatePhone" className="mb-4">
                  <Form.Label className={styles.form_label}>
                    Alternate Phone
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter alternate phone number"
                    name="alternatePhone"
                    value={userData.alt_phone}
                    onChange={handleChange}
                    disabled
                    style={{
                      backgroundColor:'white'
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formDob" className="mb-4">
                  <Form.Label className={styles.form_label}>
                    Date of Birth
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={userData.birthdate}
                    onChange={handleChange}
                    disabled
                    style={{
                      backgroundColor:'white'
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formGender" className="mb-4">
                  <Form.Label className={styles.form_label}>Gender</Form.Label>
                  <Form.Control
                    type="text"
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                    disabled
                    style={{
                      backgroundColor:'white'
                    }}
                  >
                    {/* <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option> */}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formAddress" className="mb-4">
                  <Form.Label className={styles.form_label}>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                    disabled
                    style={{
                      backgroundColor:'white'
                    }}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group controlId="formCity" className="mb-4">
                      <Form.Label className={styles.form_label}>
                        City
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter city"
                        name="city"
                        value={userData.city}
                        onChange={handleChange}
                        disabled
                        style={{
                          backgroundColor:'white'
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formState" className="mb-4">
                      <Form.Label className={styles.form_label}>
                        State
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter state"
                        name="state"
                        value={userData.state}
                        onChange={handleChange}
                        disabled
                        style={{
                          backgroundColor:'white'
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formZip" className="mb-4">
                  <Form.Label className={styles.form_label}>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter zip code"
                    name="zip"
                    value={userData.zip_code}
                    onChange={handleChange}
                    disabled
                    style={{
                      backgroundColor:'white'
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formCountry" className="mb-4">
                  <Form.Label className={styles.form_label}>
                    Nationality
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter country"
                    name="country"
                    value={userData.nationality}
                    onChange={handleChange}
                    disabled
                    style={{
                      backgroundColor:'white'
                    }}
                  />
                </Form.Group>
                {/* <Button
                  variant="primary"
                  type="submit"
                  className="mt-3 mb-5"
                  style={{
                    marginRight: "4vw",
                  }}
                >
                  Edit Profile
                </Button> */}
                <Button
                  variant="danger"
                  className="mt-3 mb-5"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Account
                </Button>
              </Form>

              {/* delete profile modal */}
              <Modal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={handleDeleteProfile}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DonorProfile;
