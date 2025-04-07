import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import { Stack } from "react-bootstrap";
import { deleteDatabase, resetDatabase } from "../services/resetDbService";

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    const reset = async () => {
      try {
        await deleteDatabase();
        await resetDatabase();
      } catch (error) {
        console.error("Failed to reset database:", error);
      }
    };
    reset();
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
