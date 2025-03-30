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
              href="/contracttool"
              style={{
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "5px",
                marginTop: "1rem",
                display: "inline-block",
                fontWeight: "bold",
                fontSize: "1.2rem",
                textDecoration: "none",
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
            >
              Contracts
            </Nav.Link>

            <NavDropdown
              title="Tools"
              id="basic-nav-dropdown"
              className="custom-dropdown ms-3"
            >
              <NavDropdown.Item href="/newcar">Add new car</NavDropdown.Item>
              <NavDropdown.Item href="/newcustomer">
                Add new customer
              </NavDropdown.Item>
              <NavDropdown.Item href="/newcompany">
                Add new company
              </NavDropdown.Item>
              <NavDropdown.Item href="/othertools">
                Other tools
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://aboutme-mg.vercel.app/">
                About me
              </NavDropdown.Item>
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
            font-weight: bold;
            font-size: 1.2rem;
            margin-top: 1rem;
          }
          .dropdown-menu .dropdown-item {
            transition: background-color 0.3s ease, color 0.3s ease;
          }
          
          .custom-dropdown .dropdown-menu .dropdown-item:hover {
            background-color: #007bff !important;
            color: white !important;
          }
        `}
      </style>
    </Navbar>
  );
}
