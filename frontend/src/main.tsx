import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routes/App";
import NewCar from "./routes/NewCar";
import NotFoundPage from "./routes/NotFoundPage";
import NewCustomer from "./routes/NewCustomer";
import NewCompany from "./routes/NewCompany";
import MainLayout from "./layouts/MainLayout";
import NewContract from "./routes/NewContract";

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
        path: "newcontract",
        element: <NewContract />,
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
