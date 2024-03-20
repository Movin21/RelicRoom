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
      <div className="flex flex-col md:flex-row items-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-brownDark font-akshar ml-5 mt-5 mb-0">
          Admin Portal
        </h1>
      </div>
      <div className="flex flex-col md:flex-row flex-grow ml-5 mb-8">
        <div className="mt-0 md:w-64">
          <SideMenu />
        </div>
        <div className="flex-grow m-6 bg-gray-100 my-0 ">
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
