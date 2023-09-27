import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CanvasProvider } from "./Canvas";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <CanvasProvider>
      <App />
    </CanvasProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
