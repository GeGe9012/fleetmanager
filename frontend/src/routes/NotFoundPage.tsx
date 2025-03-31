import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h1 className="display-3 fw-bold text-danger">404</h1>
      <h2 className="mb-3">Oops! Page not found</h2>
      <p className="text-muted">
        The page you are looking for might have been removed or temporarily
        unavailable.
      </p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Container>
  );
}
