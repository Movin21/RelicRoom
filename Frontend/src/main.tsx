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
import BidderLogin from "./pages/Bidder/BidderLogin.tsx";
import BidderSignup from "./pages/Bidder/BidderSignup.tsx";
import BidderProfile from "./pages/Bidder/BidderProfile.tsx";
import AuctioneerLogin from "./pages/Auctioneer/AuctioneerLogin.tsx";
import AuctioneerRegister from "./pages/Auctioneer/AuctioneerRegister.tsx";
import AuctioneerPortal from "./pages/Auctioneer/AuctioneerPortal.tsx";
import AuctioneerProfile from "./pages/Auctioneer/AuctioneerProfile.tsx";
import AuctionList from "./pages/Auction Listing/AuctionList.tsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import Feedback from "./pages/Customer Care/Feedback.tsx";
import Suggestions from "./pages/Customer Care/Suggestions.tsx";
import Complaints from "./pages/Customer Care/Complaints.tsx";
import FAQ from "./pages/Customer Care/FAQ.tsx";
import SingleAuction from "./pages/Auction Listing/SingleAuction.tsx";
import { AdminAuctions } from "./pages/AdminPortal/AdminAuctions.tsx";
import AdminProfile from "./pages/AdminPortal/AdminProfile.tsx";
import { AdminUsers } from "./pages/AdminPortal/AdminUsers.tsx";
import CustomerCareLayout from "./pages/layouts/CustomerCareLayout.tsx";
import CustomerCare from "./pages/Customer Care/CustomerCare.tsx";
import AuctionDashboardLayout from "./pages/layouts/AuctionDashboardLayout.tsx";
import AuctionDashboard from "./pages/Auction Listing/AuctionDashboard.tsx";
import ManageAuctions from "./pages/Auction Listing/ManageAuctions.tsx";
import UpdateAuction from "./pages/Auction Listing/UpdateAuction.tsx";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD4SG__snQ7W-DqFBLnlIq8zSV9yNCa4PY",
  authDomain: "relicroom-db857.firebaseapp.com",
  projectId: "relicroom-db857",
  storageBucket: "relicroom-db857.appspot.com",
  messagingSenderId: "840710799785",
  appId: "1:840710799785:web:cfa46e6e62eb0d00f504b8",
  measurementId: "G-X3ZEJPNV24",
};
firebase.initializeApp(firebaseConfig);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auctioneerLogin", element: <AuctioneerLogin /> },
      { path: "/auctioneerRegister", element: <AuctioneerRegister /> },
      { path: "/auctioneerPortal", element: <AuctioneerPortal /> },
      { path: "/auctioneerProfile", element: <AuctioneerProfile /> },

      { path: "/auction/listedAuctions", element: <AuctionList /> },
      { path: "/bidderLogin", element: <BidderLogin /> },
      { path: "/bidderSignup", element: <BidderSignup /> },
      { path: "/feedback", element: <Feedback /> },
      { path: "/suggestion", element: <Suggestions /> },
      { path: "/complaint", element: <Complaints /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/auction/:id", element: <SingleAuction /> },
      { path: "/bidderLogin", element: <BidderLogin /> },
      { path: "/bidderSignup", element: <BidderSignup /> },
      { path: "/bidderProfile", element: <BidderProfile /> },
    ],
  },

  {
    element: <AdminLayout />,
    children: [
      { path: "/admin", element: <AdminPortal /> },
      { path: "/adminRegister", element: <AdminRegister /> },
      { path: "/adminProfile", element: <AdminProfile /> },
      { path: "/adminAuctions", element: <AdminAuctions /> },
      { path: "/adminUsers", element: <AdminUsers /> },
    ],
  },

  {
    element: <AuctionDashboardLayout />,
    children: [
      { path: "/auctionDashboard", element: <AuctionDashboard /> },
      { path: "/manageAuctions", element: <ManageAuctions /> },
      { path: "/auction/postAuction", element: <PostAuction /> },
      { path: "/auction/updateAuction/:id", element: <UpdateAuction /> },
    ],
  },
  {
    element: <AdminLoginLayout />,
    children: [{ path: "/adminLogin", element: <AdminPortalLogin /> }],
  },
  {
    element: <CustomerCareLayout />,
    children: [{ path: "/customerCare", element: <CustomerCare /> }],
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
