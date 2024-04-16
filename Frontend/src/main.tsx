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
import FeedbackReview from "./pages/Customer Care/FeedbackReview.tsx";
import FAQmanage from "./pages/Customer Care/FAQmanage.tsx";
import FeedbackManage from "./pages/Customer Care/FeedbackManage.tsx";
import Update from "./pages/Customer Care/Update.tsx";

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
      { path: "/auctioneerLogin", element: <AuctioneerLogin /> },
      { path: "/auctioneerRegister", element: <AuctioneerRegister /> },
      { path: "/auctioneerPortal", element: <AuctioneerPortal /> },
      { path: "/auctioneerProfile", element: <AuctioneerProfile /> },
      { path: "/auction/postAuction", element: <PostAuction /> },
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
      { path: "/feedbackreview", element: <FeedbackReview/> },
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
    element: <AdminLoginLayout />,
    children: [{ path: "/adminLogin", element: <AdminPortalLogin /> }],
  },
  {
    element: <CustomerCareLayout />,
    children: [
      { path: "/feedbackManage", element: <FeedbackManage/> },
      { path: "/FAQManage", element: <FAQmanage/> },
      { path: "/FAQupdate/:id", element: <Update/> },
    ],
    
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
