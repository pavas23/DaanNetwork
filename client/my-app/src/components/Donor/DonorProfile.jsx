import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { MDBIcon } from "mdb-react-ui-kit";
import DonorNav from "./DonorNav";
import styles from "../../css/Donor/DonorProfile.module.css";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import profileImage from "../../images/default-avatar.png";

const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

function DonorProfile() {
  let navigate = useNavigate();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/donor-login", { replace: true });
    } else {
      setFlag(false);
    }
  }, [flag]);

  return (
    <div>
      <DonorNav />
      <div className={styles.main_body}>
        <Container>
          <h1 className="text-center mt-3 mb-4">My Profile</h1>
          <section style={{ backgroundColor: "#f4f5f7" }}>
            <Container className="py-5">
              <Row className="justify-content-center align-items-center">
                <Col lg="6" className="mb-4 mb-lg-0">
                  <div
                    className="mb-3"
                    style={{ borderRadius: ".5rem", textAlign: "center" }}
                  >
                    <img
                      src={profileImage}
                      alt="Avatar"
                      className="my-3"
                      style={{ width: "100px" }} // Reduced image size
                    />
                    <h5>Marie Horwitz</h5>
                    <p>Web Designer</p>
                    <MDBIcon far icon="edit mb-3" />
                  </div>
                  <div className="p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-3" />
                    <Row className="pt-1">
                      <Col size="6" className="mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">info@example.com</p>
                      </Col>
                      <Col size="6" className="mb-3">
                        <h6>Phone</h6>
                        <p className="text-muted">123 456 789</p>
                      </Col>
                    </Row>

                    <h6>Information</h6>
                    <hr className="mt-0 mb-3" />
                    <Row className="pt-1">
                      <Col size="6" className="mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">info@example.com</p>
                      </Col>
                      <Col size="6" className="mb-3">
                        <h6>Phone</h6>
                        <p className="text-muted">123 456 789</p>
                      </Col>
                    </Row>

                    <div className="d-flex justify-content-start">
                      <a href="#!">
                        <MDBIcon fab icon="facebook me-3" size="lg" />
                      </a>
                      <a href="#!">
                        <MDBIcon fab icon="twitter me-3" size="lg" />
                      </a>
                      <a href="#!">
                        <MDBIcon fab icon="instagram me-3" size="lg" />
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </Container>
      </div>
    </div>
  );
}

export default DonorProfile;
