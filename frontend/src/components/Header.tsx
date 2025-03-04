import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Header() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/" className="fs-1">
          The Fleet Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link
              href="/newcontract"
              style={{
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "5px",
                marginRight: "15px",
                marginTop: "0.7rem",
                padding: "8px 16px",
                display: "inline-block",
                fontWeight: "bold",
                fontSize: "1.2rem",
                textDecoration: "none"
              }}
            >
              Create New Contract
            </Nav.Link>

            <NavDropdown title="Tools" id="basic-nav-dropdown" className="custom-dropdown">
              <NavDropdown.Item href="/newcar">Add new car</NavDropdown.Item>
              <NavDropdown.Item href="/newcustomer">Add new customer</NavDropdown.Item>
              <NavDropdown.Item href="/newcompany">Add new company</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://aboutme-mg.vercel.app/">About me</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <style>
        {`
          .custom-dropdown .dropdown-toggle {
            background-color: #007bff !important;
            color: white !important;
            border-radius: 5px;
            padding: 8px 16px;
            font-weight: bold;
            font-size: 1.2rem;
            margin-top: 0.7rem;
          }
        `}
      </style>
    </Navbar>
  );
}
