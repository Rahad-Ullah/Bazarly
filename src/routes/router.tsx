import DashboardLayout from "@/components/layout/DashboardLayout";
import MainLayout from "@/components/layout/MainLayout";
import AboutUs from "@/pages/AboutUs/AboutUs";
import ContactUs from "@/pages/ContactUs/ContactUs";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import SignUp from "@/pages/SignUp/SignUp";
import { createBrowserRouter } from "react-router-dom";
import Error404Page from "@/pages/Error/Error404Page";
import UnauthorizedAccess from "@/pages/Error/UnauthorizedAccess";
import PrivateRoutes from "./PrivateRoutes";
import AllProducts from "@/pages/Products/Products";
import ProductDetails from "@/pages/ProductDetails/ProductDetails";
import Shop from "@/pages/Shop/Shop";
import Cart from "@/pages/Cart/Cart";
import Checkout from "@/pages/Checkout/Checkout";
import ProtectedRoutes from "./ProtectedRoutes";
import PaymentSuccess from "@/pages/Payment/PaymentSuccess";
import PaymentFail from "@/pages/Payment/PaymentFail";
import userRole from "@/constants/userRole";
import Recent from "@/pages/Recent Viewed/Recent";
import Comparison from "@/pages/Comparison/Comparison";
import ForgotPassword from "@/pages/ForgotPassword/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword/ResetPassword";
import Dashboard from "@/pages/Dashboard/Shared/Dashboard";
import MyOrders from "@/pages/Dashboard/Customer/MyOrders/MyOrders";
import Customers from "@/pages/Dashboard/Admin/Customers/Customers";
import MyShops from "@/pages/Dashboard/Vendor/MyShops/MyShops";
import MyProducts from "@/pages/Dashboard/Vendor/MyProducts/MyProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error404Page />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/recent-products",
        element: (
          <ProtectedRoutes role={userRole.CUSTOMER}>
            <Recent />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/shops/:id",
        element: (
          <ProtectedRoutes role={userRole.CUSTOMER}>
            <Shop />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/compare-products",
        element: <Comparison />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoutes role={userRole.CUSTOMER}>
            <Checkout />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/payment/success",
        element: (
          <ProtectedRoutes role="CUSTOMER">
            <PaymentSuccess />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/payment/failed",
        element: (
          <ProtectedRoutes role="CUSTOMER">
            <PaymentFail />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/unauthorized-access",
        element: <UnauthorizedAccess />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "index",
        element: <Dashboard />,
      },
      {
        path: "my-orders",
        element: (
          <ProtectedRoutes role={userRole.CUSTOMER}>
            <MyOrders />
          </ProtectedRoutes>
        ),
      },
      {
        path: "customers",
        element: (
          <ProtectedRoutes role={userRole.ADMIN}>
            <Customers />
          </ProtectedRoutes>
        ),
      },
      {
        path: "my-shops",
        element: (
          <ProtectedRoutes role={userRole.VENDOR}>
            <MyShops />
          </ProtectedRoutes>
        ),
      },
      {
        path: "shop-products",
        element: (
          <ProtectedRoutes role={userRole.VENDOR}>
            <MyProducts />
          </ProtectedRoutes>
        ),
      },
      // {
      //   path: "add-facility",
      //   element: (
      //     <ProtectedRoutes role="admin">
      //       <AddFacility />
      //     </ProtectedRoutes>
      //   ),
      // },
      // {
      //   path: "add-admin",
      //   element: (
      //     <ProtectedRoutes role="admin">
      //       <AddAdmin />
      //     </ProtectedRoutes>
      //   ),
      // },
    ],
  },
]);

export default router;
