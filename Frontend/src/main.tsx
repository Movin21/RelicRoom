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
import AdminRegister from "./pages/AdminPortal/AdminRegister.tsx";
import AuctionList from "./pages/Auction Listing/AuctionList.tsx";
const firebaseConfig = {};
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

const firebaseConfig = {
  apiKey: "AIzaSyA2zhpGMIkd9iN2SmlLkcVz1mlKRy23v60",
  authDomain: "relicroom-632b8.firebaseapp.com",
  projectId: "relicroom-632b8",
  storageBucket: "relicroom-632b8.appspot.com",
  messagingSenderId: "134645367706",
  appId: "1:134645367706:web:05ce85a588a5f36c4af023",
  measurementId: "G-00NWB1RQTG",
};

firebase.initializeApp(firebaseConfig);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auction/postAuction", element: <PostAuction /> },
      { path: "/auction/listedAuctions", element: <AuctionList /> },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      { path: "/admin", element: <AdminPortal /> },
      { path: "/adminRegister", element: <AdminRegister /> },
    ],
  },
  {
    element: <AdminLoginLayout />,
    children: [{ path: "/adminLogin", element: <AdminPortalLogin /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
