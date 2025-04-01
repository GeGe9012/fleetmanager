import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import { Stack } from "react-bootstrap";
import WebSocketClient from "../components/WebSocketClient";

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Stack gap={4}>
      <Header />
      <Outlet />
      <WebSocketClient />
    </Stack>
  );
}
