import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api-routes";
import errorHandler from "./middleware/error-handler";
// import swaggerUi from "swagger-ui-express";
// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerOptions from "./constants/swagger-options";

const app = express();

// const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(cors());
app.use(express.json());

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger UI integráció

app.use("/api", apiRoutes);

app.use(errorHandler);

export default app;
