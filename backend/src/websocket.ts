import { WebSocketServer } from "ws";
import { Server } from "http";
import resetDbService from "./services/resetdb-service";

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });

  wss.on("connection", (ws) => {
    console.log("🔗 Client connected to WebSocket");

    ws.on("close", () => {
      console.log("❌ Client disconnected");
      console.log("🛠️ Database reset triggered!");
      resetDbService.resetDatabase();
    });
  });
}
