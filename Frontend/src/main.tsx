import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import firebase from "firebase/compat/app";
import "./index.css";
import RootLayout from "./pages/layouts/RootLayout.tsx";
import AdminLayout from "./pages/layouts/AdminLaytout.tsx";
import AdminPortal from "./pages/AdminPortal/AdminPortal.tsx";

const firebaseConfig = {};

firebase.initializeApp(firebaseConfig);

const router = createBrowserRouter([
  { element: <RootLayout />, children: [{ path: "/", element: <Home /> }] },
  {
    element: <AdminLayout />,
    children: [{ path: "/admin", element: <AdminPortal /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
