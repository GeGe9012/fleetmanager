import express from "express";
import customerController from "../controllers/customer-controller";
import yupValidate from "../middleware/validate";
import {
  createCustomerSchema,
  updateCustomerSchema,
} from "../schemas/customer-schema";

const router = express.Router();

router.get("/", customerController.getAllCustomers);
router.post(
  "/",
  yupValidate(createCustomerSchema),
  customerController.createCustomer
);
router.delete("/:customerId", customerController.deleteCustomer);
router.patch(
  "/:customerId",
  yupValidate(updateCustomerSchema),
  customerController.updateCustomer
);

export default router;
