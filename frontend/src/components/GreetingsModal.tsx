import { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { resetDatabase } from "../services/resetDbService";

interface ResetDatabaseModalProps {
  show: boolean;
  onHide: () => void;
}

const GreetingsModal = ({ show, onHide }: ResetDatabaseModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDatabaseReset = () => {
    const reset = async () => {
      try {
        setLoading(true);
        await resetDatabase();
      } catch (error) {
        console.error("Hiba történt az adatbázis resetelésekor:", error);
      } finally {
        onHide();
        setLoading(false);
      }
    };
    reset();
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Welcome to the Fleet Management!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Welcome, feel free to explore the system.</p>
        <p>If you want to reset the database, click the button below:</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleDatabaseReset}
          disabled={loading}
        >
          {loading ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            "Reset Database"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GreetingsModal;
