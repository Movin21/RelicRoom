import Footer from "@/components/ui/Shared/Footer";
import AdminNavBar from "../../pages/AdminPortal/shared/AdminNavBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-10">
        <AdminNavBar />
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className=" bottom-0 left-0 w-full z-10">
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
