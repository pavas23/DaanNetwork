import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "../../css/Donor/DonorNav.module.css";
import { Link } from "react-router-dom";

const x =
  "#basic-nav-dropdown::after{ display: none; } .navbar-nav .nav-link.active{color:#53a937;fontWeight:semi-bold;}";

const DonorNav = () => {
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
                Donate
              </Nav.Link>
              <Nav.Link href="#impactPage" className={styles.nav_opt}>
                Donation Requests
              </Nav.Link>
              <Nav.Link href="#contactPage" className={styles.nav_opt}>
                Accepted Donation
              </Nav.Link>
            </Nav>
            <Nav>
              <Link
                className={styles.logout_btn}
                onClick={() => {
                  console.log("Hello");
                }}
              >
                Logout
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default DonorNav;
