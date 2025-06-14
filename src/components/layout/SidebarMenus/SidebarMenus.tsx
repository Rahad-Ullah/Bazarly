import {
  History,
  Mails,
  Receipt,
  Shield,
  ShoppingCart,
  Star,
  Store,
  Tags,
  Ticket,
  Users,
  UsersRound,
} from "lucide-react";

export const SuperAdminSidebarMenus = [
  {
    title: "Customers",
    path: "/dashboard/customers",
    icon: <UsersRound size={20} />,
  },
  {
    title: "Vendors",
    path: "/dashboard/vendors",
    icon: <Users size={20} />,
  },
  {
    title: "Admins",
    path: "/dashboard/admins",
    icon: <Shield size={20} />,
  },
  {
    title: "Shops",
    path: "/dashboard/shops",
    icon: <Store size={20} />,
  },
  {
    title: "Categories",
    path: "/dashboard/categories",
    icon: <Tags size={20} />,
  },
  {
    title: "Coupons",
    path: "/dashboard/coupons",
    icon: <Ticket size={20} />,
  },
  {
    title: "Newsletters",
    path: "/dashboard/newsletters",
    icon: <Mails size={20} />,
  },
];

export const AdminSidebarMenus = [
  {
    title: "Customers",
    path: "/dashboard/customers",
    icon: <UsersRound size={20} />,
  },
  {
    title: "Vendors",
    path: "/dashboard/vendors",
    icon: <Users size={20} />,
  },
  {
    title: "Shops",
    path: "/dashboard/shops",
    icon: <Store size={20} />,
  },
  {
    title: "Categories",
    path: "/dashboard/categories",
    icon: <Tags size={20} />,
  },
  {
    title: "Coupons",
    path: "/dashboard/coupons",
    icon: <Ticket size={20} />,
  },
  {
    title: "Newsletters",
    path: "/dashboard/newsletters",
    icon: <Mails size={20} />,
  },
  // {
  //   title: "Reviews",
  //   path: "/dashboard/reviews",
  //   icon: <Star size={20} />,
  // },
  // {
  //   title: "Payments",
  //   path: "/dashboard/payments",
  //   icon: <CircleDollarSign size={20} />,
  // },
];

export const VendorSidebarMenus = [
  {
    title: "My Shops",
    path: "/dashboard/my-shops",
    icon: <Store size={20} />,
  },
  {
    title: "Orders",
    path: "/dashboard/orders",
    icon: <Receipt size={20} />,
  },
  {
    title: "Products",
    path: "/dashboard/shop-products",
    icon: <ShoppingCart size={20} />,
  },
  {
    title: "Reviews",
    path: "/dashboard/shop-reviews",
    icon: <Star size={20} />,
  },
  {
    title: "Followers",
    path: "/dashboard/shop-followers",
    icon: <UsersRound size={20} />,
  },
];

export const CustomerSidebarMenus = [
  {
    title: "My Orders",
    path: "/dashboard/my-orders",
    icon: <ShoppingCart size={20} />,
  },
  {
    title: "Followed Shops",
    path: "/dashboard/my-followed-shops",
    icon: <Store size={20} />,
  },
  {
    title: "Recent Viewed",
    path: "/dashboard/recent-viewed",
    icon: <History size={20} />,
  },
];
