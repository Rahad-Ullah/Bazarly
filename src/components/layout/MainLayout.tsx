import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "@/pages/Home/Footer/Footer";
import ScrollToTopButton from "../shared/ScrollToTopButton";
import ScrollToTop from "../shared/ScrollToTop";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ScrollToTop />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
