import { WebSocketServer } from "ws";
import resetDbService from "./services/resetdb-service";

export function setupWebSocket(server: any) {
  const wss = new WebSocketServer({ server });
  
  wss.on("connection", (ws) => {
    console.log("🔗 Client connected to WebSocket");
    
    ws.on("close", () => {
      console.log("❌ Client disconnected");
      console.log("🛠️ Database reset triggered!");
      resetDbService.resetDatabase();
    });
  });
}
