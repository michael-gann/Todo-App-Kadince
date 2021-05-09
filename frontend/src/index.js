import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App.jsx";

import { restoreCSRF, fetch } from "./util/csrf";

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = fetch;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
