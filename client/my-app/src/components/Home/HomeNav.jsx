import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "../../css/Home/HomeNav.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function HomeNav() {
  const x = `#basic-nav-dropdown::after{ display: none; } .navbar-nav .nav-link.active{color:#53a937;font-weight:semi-bold;}
  .dropdown-item.active, .dropdown-item:active {background-color: #195406 !important; }
    `;
  return (
    <>
      <style>{x}</style>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand
            className={styles.kaushan_script_regular}
            style={{
              color: "#078534",
              fontWeight: "bold",
              fontSize: "160%",
              paddingRight: "2%",
            }}
          >
            DaanNetwork
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" id="dekho_zara">
              <Nav.Link href="#aboutUsPage" className={styles.nav_opt}>
                About Us
              </Nav.Link>
              <Nav.Link href="#impactPage" className={styles.nav_opt}>
                Impact
              </Nav.Link>
              <Nav.Link href="#contactPage" className={styles.nav_opt}>
                Contact Us
              </Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown
                id="basic-nav-dropdown"
                className={styles.dropdown}
                display="none"
                title={<span className={styles.login_btn}>Login</span>}
                style={{
                  width: "5rem",
                  backgroundColor: "#078534",
                  borderRadius: "1rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <NavDropdown.Item>
                  <Link
                    to="/ngo-login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Login as a NGO
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link
                    to="/donor-login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Login as a Donor
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default HomeNav;
