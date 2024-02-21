import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "../../css/Home/HomeNav.module.css";
import { Link } from "react-router-dom";

function HomeNav() {
  const x =
    "#basic-nav-dropdown::after{ display: none; } .navbar-nav .nav-link.active{color:#53a937;fontWeight:semi-bold;}";
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
                <NavDropdown.Item>Login as a NGO</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Login as a Donor</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default HomeNav;
