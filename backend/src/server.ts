import http from "http";
import app from "./app";
import { PORT } from "./constants/base";
import { setupWebSocket } from "./websocket";

const server = http.createServer(app);

setupWebSocket(server);

server.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}...`);
});
