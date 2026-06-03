import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,

        style: {
          background: "#111827",
          color: "#ffffff",
          borderRadius: "14px",
          padding: "14px 18px",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        },

        success: {
          style: {
            background: "#10b981",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#10b981",
          },
        },

        error: {
          style: {
            background: "#ef4444",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#ef4444",
          },
        },
      }}
    />
    <App />
  </>,
);
