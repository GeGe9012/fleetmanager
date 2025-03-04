import { Outlet, useLocation } from "react-router-dom";

import { useEffect } from "react";
import Header from "../components/Header";

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
