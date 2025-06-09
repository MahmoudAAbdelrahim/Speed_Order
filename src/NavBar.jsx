import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="logo">
          <span className="logo-text">Speed <small>order</small></span>
        </Navbar.Brand>

        {/* الأيقونات دايمًا ظاهرة على اليمين */}
        <div className="d-flex align-items-center mx-auto text-center gap-3 order-lg-2">
          <Nav.Link href="#search"><FaSearch size={18} color="white" /></Nav.Link>
          <Nav.Link href="./Cart"><FaShoppingCart size={18} color="white" /></Nav.Link>
          <Nav.Link href="./profile"><FaUser size={18} color="white" /></Nav.Link>
        </div>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto" />

        <Navbar.Collapse id="responsive-navbar-nav" className="order-lg-1">
          <Nav className="mx-auto text-center">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="./Product">Product</Nav.Link>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
