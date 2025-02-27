import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import App from "./components/App";

createRoot(document.getElementById("root")!).render(
  <div className="m-4">
    <h1 className="display-4 text-secondary">The Fleet Manager</h1>
    <App />
  </div>
);
