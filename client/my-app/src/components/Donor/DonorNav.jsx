import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "../../css/Donor/DonorNav.module.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";

const x =
  "#basic-nav-dropdown::after{ display: none; } .navbar-nav .nav-link.active{color:#53a937;fontWeight:semi-bold;}";

const DonorNav = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/donor-login", { replace: true });
  };

  return (
    <>
      <style>{x}</style>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Nav.Link href="#" className={styles.nav_opt}>
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
          </Nav.Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" id="dekho_zara">
              <Nav.Link href="/donor-post" className={styles.nav_opt}>
                Donate
              </Nav.Link>
              <Nav.Link href="/donor-posts" className={styles.nav_opt}>
                My Donation Requests
              </Nav.Link>
              <Nav.Link href="/donor-accpted-posts" className={styles.nav_opt}>
                My Accepted Donations
              </Nav.Link>
              <Nav.Link to="/donation-drive" className={styles.nav_opt}>
                Donation Drive
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link className={styles.logout_btn} onClick={handleLogout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default DonorNav;
