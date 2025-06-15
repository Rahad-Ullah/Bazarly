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
import ShopReviews from "@/pages/Dashboard/Vendor/ShopReviews/ShopReviews";
import ShopOrders from "@/pages/Dashboard/Vendor/ShopOrders/ShopOrders";
import AllShops from "@/pages/AllShops/AllShops";
import RecentViewed from "@/pages/Dashboard/Customer/RecentViewed/RecentViewed";
import FollowedShops from "@/pages/Dashboard/Customer/FollowedShops/FollowedShops";
import Vendors from "@/pages/Dashboard/Admin/Vendors/Vendors";
import Shops from "@/pages/Dashboard/Admin/Shops/Shops";
import Categories from "@/pages/Dashboard/Admin/Categories/Categories";
import Coupons from "@/pages/Dashboard/Admin/Coupons/Coupons";
import Newsletters from "@/pages/Dashboard/Admin/Newsletters/Newsletters";
import ShopFollowers from "@/pages/Dashboard/Vendor/ShopFollowers/ShopFollowers";
import AdminsPage from "@/pages/Dashboard/Admin/Admins/Admins";

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
          <ProtectedRoutes roles={[userRole.CUSTOMER]}>
            <Recent />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/shops",
        element: <AllShops />,
      },
      {
        path: "/shops/:id",
        element: (
          <ProtectedRoutes roles={[userRole.CUSTOMER]}>
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
          <ProtectedRoutes roles={[userRole.CUSTOMER]}>
            <Checkout />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/payment/success",
        element: (
          <ProtectedRoutes roles={[userRole.CUSTOMER]}>
            <PaymentSuccess />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/payment/failed",
        element: (
          <ProtectedRoutes roles={[userRole.CUSTOMER]}>
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
          <ProtectedRoutes roles={[userRole.CUSTOMER]}>
            <MyOrders />
          </ProtectedRoutes>
        ),
      },
      {
        path: "recent-viewed",
        element: (
          <ProtectedRoutes roles={[userRole.CUSTOMER]}>
            <RecentViewed />
          </ProtectedRoutes>
        ),
      },
      {
        path: "my-followed-shops",
        element: (
          <ProtectedRoutes roles={[userRole.CUSTOMER]}>
            <FollowedShops />
          </ProtectedRoutes>
        ),
      },
      {
        path: "my-shops",
        element: (
          <ProtectedRoutes roles={[userRole.VENDOR]}>
            <MyShops />
          </ProtectedRoutes>
        ),
      },
      {
        path: "shop-products",
        element: (
          <ProtectedRoutes roles={[userRole.VENDOR]}>
            <MyProducts />
          </ProtectedRoutes>
        ),
      },
      {
        path: "shop-reviews",
        element: (
          <ProtectedRoutes roles={[userRole.VENDOR]}>
            <ShopReviews />
          </ProtectedRoutes>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoutes roles={[userRole.VENDOR]}>
            <ShopOrders />
          </ProtectedRoutes>
        ),
      },
      {
        path: "shop-followers",
        element: (
          <ProtectedRoutes roles={[userRole.VENDOR]}>
            <ShopFollowers />
          </ProtectedRoutes>
        ),
      },
      {
        path: "customers",
        element: (
          <ProtectedRoutes roles={[userRole.ADMIN, userRole.SUPER_ADMIN]}>
            <Customers />
          </ProtectedRoutes>
        ),
      },
      {
        path: "vendors",
        element: (
          <ProtectedRoutes roles={[userRole.ADMIN, userRole.SUPER_ADMIN]}>
            <Vendors />
          </ProtectedRoutes>
        ),
      },
      {
        path: "admins",
        element: (
          <ProtectedRoutes roles={[userRole.SUPER_ADMIN]}>
            <AdminsPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "shops",
        element: (
          <ProtectedRoutes roles={[userRole.ADMIN, userRole.SUPER_ADMIN]}>
            <Shops />
          </ProtectedRoutes>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoutes roles={[userRole.ADMIN, userRole.SUPER_ADMIN]}>
            <Categories />
          </ProtectedRoutes>
        ),
      },
      {
        path: "coupons",
        element: (
          <ProtectedRoutes roles={[userRole.ADMIN, userRole.SUPER_ADMIN]}>
            <Coupons />
          </ProtectedRoutes>
        ),
      },
      {
        path: "newsletters",
        element: (
          <ProtectedRoutes roles={[userRole.ADMIN, userRole.SUPER_ADMIN]}>
            <Newsletters />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

export default router;
