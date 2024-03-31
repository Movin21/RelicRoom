import Footer from "@/components/ui/Shared/Footer";
import { Outlet } from "react-router-dom";

const AdminLoginLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className=" bottom-0 left-0 w-full z-10">
        <Footer />
      </div>
    </div>
  );
};

export default AdminLoginLayout;
