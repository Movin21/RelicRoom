import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import PostAuction from "./pages/Auction Listing/PostAuction.tsx";
import firebase from "firebase/compat/app";
import "./index.css";
import RootLayout from "./pages/layouts/RootLayout.tsx";
import AdminLayout from "./pages/layouts/AdminLaytout.tsx";
import AdminPortal from "./pages/AdminPortal/AdminPortal.tsx";
import AdminPortalLogin from "./pages/AdminPortal/AdminPortalLogin.tsx";
import AdminLoginLayout from "./pages/layouts/AdminLoginLayout.tsx";
const firebaseConfig = {};

firebase.initializeApp(firebaseConfig);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auction/postAuction", element: <PostAuction /> },
    ],
  },
  {
    element: <AdminLayout />,
    children: [{ path: "/admin", element: <AdminPortal /> }],
  },
  {
    element: <AdminLoginLayout />,
    children: [{ path: "/adminLogin", element: <AdminPortalLogin /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
