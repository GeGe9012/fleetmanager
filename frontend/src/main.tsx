import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App";
import NewCar from "./components/NewCar";
import NotFoundPage from "./components/NotFoundPage";
import NewCustomer from "./components/NewCustomer";
import NewCompany from "./components/NewCompany";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "newcar",
        element: <NewCar />,
      },
      {
        path: "newcustomer",
        element: <NewCustomer />,
      },
      {
        path: "newcompany",
        element: <NewCompany />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <div className="m-4">
    <RouterProvider router={router} />
  </div>
);
