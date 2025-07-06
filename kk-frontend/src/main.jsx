import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FlashMessageProvider } from "./FlashMessageContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FlashMessageProvider>
      <App />
    </FlashMessageProvider>
  </React.StrictMode>
);
