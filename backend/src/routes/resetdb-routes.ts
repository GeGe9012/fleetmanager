import express from "express";
import resetDbService from "../services/resetdb-service";

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
      await resetDbService.resetDatabase();
      res.status(200).json({ message: "Database reset successfully." });
    } catch (error) {
      next(error);
    }
  });
  

export default router;
