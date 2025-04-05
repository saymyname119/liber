import { Link } from 'react-router-dom';
import { Container, Nav, Navbar as BSNavbar } from 'react-bootstrap';

const Navbar = () => (
  <BSNavbar bg="dark" variant="dark" expand="lg">
    <Container>
      <BSNavbar.Brand as={Link} to="/">SocialNFT</BSNavbar.Brand>
      <BSNavbar.Toggle />
      <BSNavbar.Collapse>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/home">Home</Nav.Link>
          <Nav.Link as={Link} to="/profile/0x123">My Profile</Nav.Link>
        </Nav>
      </BSNavbar.Collapse>
    </Container>
  </BSNavbar>
);

export default Navbar;
