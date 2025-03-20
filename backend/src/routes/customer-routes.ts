import express from "express";
import customerController from "../controllers/customer-controller";

const router = express.Router();

router.get("/", customerController.getAllCustomers);
router.post("/", customerController.createCustomer);

export default router;