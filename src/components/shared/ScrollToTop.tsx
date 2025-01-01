import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Get the current route path

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // Smooth scrolling for route changes
    });
  }, [pathname]);

  return null; // No rendering needed
};

export default ScrollToTop;
