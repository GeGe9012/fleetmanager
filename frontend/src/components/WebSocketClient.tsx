import { useEffect } from "react";
import { WSS_BACKEND_URL } from "../constants/backend";

export default function WebSocketClient() {
  useEffect(() => {
    const ws = new WebSocket(WSS_BACKEND_URL);

    ws.onopen = () => console.log("✅ Connected to WebSocket");
    ws.onclose = () => console.log("❌ WebSocket connection closed");

    return () => {
      ws.close();
    };
  }, []);

  return null;
}
