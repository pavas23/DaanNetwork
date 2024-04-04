import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "../../css/Admin/AdminNav.module.css";
import { Link } from "react-router-dom";


function AdminNav() {
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
              <Nav.Link href="/admin-donor" className={styles.nav_opt}>
                Donors
              </Nav.Link>
              <Nav.Link href="admin-ngo" className={styles.nav_opt}>
                NGOs
              </Nav.Link>
              <Nav.Link href="#contactPage" className={styles.nav_opt}>
               Dashboard
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link
                id="basic-nav-dropdown"
                className={styles.dropdown}
                display="none"
                style={{
                  width: "5rem",
                  borderRadius: "1rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <span className={styles.logout_btn}>Logout</span>
                
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNav;