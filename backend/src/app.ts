import express from "express";
import cors from "cors";
// import errorHandler from "./middlewares/error-handler-middleware";
import apiRoutes from "./routes/api-routes";
// import swaggerUi from "swagger-ui-express";
// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerOptions from "./constants/swagger-options";

const app = express();

// const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(cors()); // CORS engedélyezése
app.use(express.json()); // JSON formátumú adatok fogadása

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger UI integráció

app.use("/api", apiRoutes); // Egyéb API végpontok

// app.use(errorHandler); // Hibakezelő middleware

export default app;
