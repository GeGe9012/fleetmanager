import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api-routes";
import errorHandler from "./middleware/error-handler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.use(errorHandler);

export default app;
