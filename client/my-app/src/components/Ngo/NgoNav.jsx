import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "../../css/Ngo/NgoNav.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
const x =
  "#basic-nav-dropdown::after{ display: none; } .navbar-nav .nav-link.active{color:#53a937;fontWeight:semi-bold;}";

const NgoNavBar = () => {
  let navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("auth-token");
    navigate("/", { replace: true });
  };

  return (
    <div style={{ backgroundColor: "#f6f6f6" }}>
      <style>{x}</style>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand
            className={styles.kaushan_script_regular}
            href="/ngo-donations"
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
              <Nav.Link href="/ngo-drive" className={styles.nav_opt}>
                Create Donation Drive
              </Nav.Link>
              <Nav.Link href="/ngo-history" className={styles.nav_opt}>
                Profile History
              </Nav.Link>
              {/* <Nav.Link href='#contactPage' className={styles.nav_opt}></Nav.Link> */}
            </Nav>
            <Nav>
              <Link className={styles.logout_btn} onClick={logout}>
                Logout
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NgoNavBar;
