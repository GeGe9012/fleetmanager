import express from "express";
import resetDbService from "../services/resetdb-service";

const router = express.Router();

router.post('/api/resetdb', async (req, res) => {
  try {
    console.log('Received request to reset database');
    await resetDbService.resetDatabase();
    res.status(200).json({ message: 'Database reset successful' });
  } catch (error) {
    console.error('Error resetting database:', error);
    res.status(500).json({ error: 'Failed to reset database' });
  }
});
  

export default router;
