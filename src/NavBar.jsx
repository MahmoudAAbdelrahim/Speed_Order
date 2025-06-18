import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';

function CollapsibleExample({cartCount }) {
   
  
  
  const [userImage, setUserImage] = useState("/img/features3.png");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser && storedUser.image) {
      setUserImage(storedUser.image);
    }
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="logo">
          <span className="logo-text">Speed <small>order</small></span>
        </Navbar.Brand>

        <div className="d-flex align-items-center mx-auto text-center gap-3 order-lg-2">
          <Nav.Link href="#search"><FaSearch size={18} color="white" /></Nav.Link>
          <Nav.Link href="/Cart" style={{ position: 'relative', display: 'inline-block' }}>
  <div style={{ position: 'relative' }}>
    <FaShoppingCart size={22} color="white" />
    {cartCount > 0 && (
      <span
        style={{
          position: 'absolute',
          top: '-8px',
          right: '-10px',
          background: '#17504C',
          color: 'white',
          borderRadius: '50%',
          padding: '2px 6px',
          fontSize: '12px',
          fontWeight: 'bold',
          lineHeight: '1',
          minWidth: '20px',
          textAlign: 'center',
        }}
      >
        {cartCount}
      </span>
    )}
  </div>
</Nav.Link>
          <Nav.Link href="/profile">
          <div className="bob">
            {userImage ? (
              <img
                src={userImage}
                alt="User"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />
            ) : (
              <FaUser size={30} style={{ borderRadius: "50%", backgroundColor: "#ccc", padding: "5px" }} />
            )}

          </div>
          </Nav.Link>
        </div>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto" />

        <Navbar.Collapse id="responsive-navbar-nav" className="order-lg-1">
          <Nav className="mx-auto text-center">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Product">Product</Nav.Link>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/OrderTracking">OrderTracking</NavDropdown.Item>
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
