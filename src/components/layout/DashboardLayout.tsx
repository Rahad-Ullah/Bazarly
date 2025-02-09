import {
  Bell,
  Home,
  Menu,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  logOut,
  selectAuth,
  selectCurrentUser,
} from "@/redux/features/auth/AuthSlice";
import { NavLink } from "react-router-dom";
import user_photo from "../../assets/icons/user.png";
import userRole from "@/constants/userRole";
import {
  AdminSidebarMenus,
  CustomerSidebarMenus,
  VendorSidebarMenus,
} from "./SidebarMenus/SidebarMenus";

const DashboardLayout = () => {
  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] gap-2">
        {/* sidebar for large screen */}
        <div className="hidden lg:block">
          <div className="flex w-full max-w-[280px] h-full max-h-screen flex-col gap-6 p-4 shadow-md fixed left-0 top-0">
            <div className="flex h-14 items-center lg:h-[60px] pb-2 shadow-sm">
              <Link to="/" className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold">
                  <span className="text-primary">Bazarly</span>
                </h1>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="size-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            {/* nav menu */}
            <div className="flex-1">
              <nav className="grid items-start gap-1 font-medium">
                <NavLink
                  to="/dashboard/index"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-primary text-white transition-all"
                      : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
                  }
                >
                  <Home className="size-5" />
                  Dashboard
                </NavLink>
                {/* menus for customer */}
                <div className="flex flex-col gap-2">
                  {user?.role === userRole.CUSTOMER &&
                    CustomerSidebarMenus.map((item, idx) => (
                      <NavLink
                        to={item.path}
                        key={idx}
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-primary text-white transition-all"
                            : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
                        }
                      >
                        {item.icon}
                        {item.title}
                      </NavLink>
                    ))}
                </div>
                {/* menus for admin */}
                <div className="flex flex-col gap-2">
                  {user?.role === userRole.ADMIN &&
                    AdminSidebarMenus.map((item, idx) => (
                      <NavLink
                        to={item.path}
                        key={idx}
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-primary text-white transition-all"
                            : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
                        }
                      >
                        {item.icon}
                        {item.title}
                      </NavLink>
                    ))}
                </div>
                {/* menus for vendor */}
                <div className="flex flex-col gap-2">
                  {user?.role === userRole.VENDOR &&
                    VendorSidebarMenus.map((item, idx) => (
                      <NavLink
                        to={item.path}
                        key={idx}
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-primary text-white transition-all"
                            : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
                        }
                      >
                        {item.icon}
                        {item.title}
                      </NavLink>
                    ))}
                </div>
              </nav>
            </div>
            {/* sidebar bottom elements */}
            {/* <div className="mt-auto">
              <Card x-chunk="dashboard-02-chunk-0">
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support
                    team.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div> */}
          </div>
        </div>

        {/* main ui */}
        <div className="flex flex-col w-full gap-6 p-4 pt-0">
          <header className="flex h-14 items-center gap-4 lg:h-[75px] xl:shadow-sm sticky top-0 z-20 bg-white">
            {/* sidebar toggle menu icon for small screen */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                {/* nav menus */}
                <Link
                  to="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <h1 className="text-xl font-extrabold">
                    <span className="text-primary">Bazarly</span>
                  </h1>
                </Link>
                <nav className="grid items-start gap-2 font-medium">
                  <NavLink
                    to="/dashboard/index"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-primary transition-all hover:text-primary"
                        : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    }
                  >
                    <Home className="size-5" />
                    Dashboard
                  </NavLink>
                  {/* menus for customer */}
                  <div className="flex flex-col gap-2">
                    {user?.role === userRole.CUSTOMER &&
                      CustomerSidebarMenus.map((item, idx) => (
                        <NavLink
                          to={item.path}
                          key={idx}
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "pending"
                              : isActive
                              ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-primary text-white transition-all"
                              : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
                          }
                        >
                          {item.icon}
                          {item.title}
                        </NavLink>
                      ))}
                  </div>
                  {/* menus for admin */}
                  <div className="flex flex-col gap-2">
                    {user?.role === userRole.ADMIN &&
                      AdminSidebarMenus.map((item, idx) => (
                        <NavLink
                          to={item.path}
                          key={idx}
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "pending"
                              : isActive
                              ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-primary text-white transition-all"
                              : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
                          }
                        >
                          {item.icon}
                          {item.title}
                        </NavLink>
                      ))}
                  </div>
                  {/* menus for vendor */}
                  <div className="flex flex-col gap-2">
                    {user?.role === userRole.VENDOR &&
                      VendorSidebarMenus.map((item, idx) => (
                        <NavLink
                          to={item.path}
                          key={idx}
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "pending"
                              : isActive
                              ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-primary text-white transition-all"
                              : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
                          }
                        >
                          {item.icon}
                          {item.title}
                        </NavLink>
                      ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            {/* search field */}
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 size-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            {/* user profile in the right side */}
            {auth.accessToken ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer md:pr-4">
                    <Button
                      variant="outline"
                      className="overflow-hidden rounded-full size-10 p-0 hover:border-primary"
                    >
                      <img
                        src={user_photo}
                        className="overflow-hidden rounded-full"
                      />
                    </Button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <p>My Account</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to={"/dashboard/index"}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={`/dashboard/profile`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => dispatch(logOut())}
                    className="text-destructive"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-1">
                <Link to={"/login"}>
                  <Button
                    variant={"ghost"}
                    className="text-base relative flex items-center gap-2"
                  >
                    Login
                  </Button>
                </Link>
                <Link to={"/sign-up"}>
                  <Button className="text-base relative flex items-center gap-2">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </header>
          {/* main content body */}
          <main className="flex flex-1 flex-col">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
