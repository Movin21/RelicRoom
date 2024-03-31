import Footer from "@/components/ui/Shared/Footer";
import NavBar from "@/components/ui/Shared/NavBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <div className="top-0 bg-white">
        <NavBar />
      </div>
      <div>
        <Outlet />
      </div>
      <div className="bottom-0 left-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
