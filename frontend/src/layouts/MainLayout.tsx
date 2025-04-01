import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import { Stack } from "react-bootstrap";
import { resetDatabase } from "../services/resetDbService";

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    const handleUnload = () => {
      resetDatabase();
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Stack gap={4}>
      <Header />
      <Outlet />
    </Stack>
  );
}
