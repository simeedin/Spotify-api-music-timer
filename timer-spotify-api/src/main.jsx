import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import MusicTimer from "./pages/MusicTimer.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/timer",
    element: <MusicTimer />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
