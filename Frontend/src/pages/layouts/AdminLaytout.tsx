import Footer from "@/components/ui/Shared/Footer";
import AdminNavBar from "../../pages/AdminPortal/shared/AdminNavBar";
import { Outlet } from "react-router-dom";
import SideMenu from "../AdminPortal/shared/SideMenu";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="sticky top-0 z-10">
        <AdminNavBar />
      </div>
      <div className="flex items-center mb-8">
        <h1 className="text-4xl font-bold text-brownDark font-akshar ml-5  mt-3  ">
          Admin Portal
        </h1>
      </div>
      <div className="flex flex-row flex-grow ml-5 mb-8 ">
        <div>
          <SideMenu />
        </div>
        <div className="flex-grow m-6 bg-white my-0 shadow-md ">
          <Outlet />
        </div>
      </div>
      <div className="bottom-0 left-0 w-full z-10">
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
