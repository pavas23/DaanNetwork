import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './CSS files/homenav.css'

function HomeNav() {
  return (
    <>
        <Navbar >
            <Container>
            <Navbar.Brand className="kaushan-script-regular" style={{color:"#078534",fontWeight:"bold",fontSize:"160%",paddingRight:"2%"}}>DaanNetwork</Navbar.Brand>
            <Nav className="me-auto" id='dekho_zara'>
                <Nav.Link className='nav_opt'>About Us</Nav.Link>
                <Nav.Link className='nav_opt'>Impact</Nav.Link>
                <Nav.Link className='nav_opt'>Contact Us</Nav.Link>
            </Nav>
            <Nav>
                <NavDropdown id="basic-nav-dropdown" title={
                    <span className='login_btn'>
                        Login
                    </span>
                } style={{width:"5rem",backgroundColor:"#078534", borderRadius: "1rem", display:'flex',justifyContent:'center'}}>
                    <NavDropdown.Item>Login as a NGO</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>Login as a Donor</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Container>
        </Navbar>
    </>
  );
}

export default HomeNav;
