import { Link } from "react-router-dom";

const TopNavbar = () => {
  return (
    <div className="hidden md:block w-full z-50 bg-primary border-b border-zinc-300 border-opacity-40 px-4 md:px-6 lg:px-10">
      <div className="flex h-10 w-full max-w-screen-2xl mx-auto shrink-0 justify-between items-center">
        <div className="text-sm text-zinc-100 font-semibold transition-all flex items-center gap-5">
          <Link to={"/dashboard/index"} className="hover:text-slate-800">
            My Account
          </Link>
          <Link to={"/about-us"} className="hover:text-slate-800">
            About Us
          </Link>
          <Link to={"/contact"} className="hover:text-slate-800">
            Contact
          </Link>
        </div>

        {/* Top bar right side menu items */}
        <div className="text-sm text-zinc-100 font-semibold transition-all flex items-center gap-5">
          <Link to={""} className="hover:text-slate-800">
            Call Us +880 1234-567890
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
