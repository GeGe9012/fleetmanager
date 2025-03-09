import http from "http";
import app from "./app";
import { PORT } from "./constant/base";
// import { initializeSocket } from "./io.js";

const server = http.createServer(app);

// initializeSocket(server);

server.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}...`);
});
