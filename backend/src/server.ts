import http from "http";
import app from "./app";
import { PORT } from "./constants/base";

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}...`);
});
