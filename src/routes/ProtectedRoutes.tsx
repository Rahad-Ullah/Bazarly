import {
  selectAccessToken,
} from "@/redux/features/auth/AuthSlice";
import { useGetProfileQuery } from "@/redux/features/profile/profileApi";
import { useAppSelector } from "@/redux/hook";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type TProtectedRoutesProps = {
  children: ReactNode;
  roles: string[];
};

const ProtectedRoutes = ({ children, roles }: TProtectedRoutesProps) => {
  const token = useAppSelector(selectAccessToken);
  const { data: profile, isLoading } = useGetProfileQuery(undefined);
  const location = useLocation();

  if (!token) {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }

  // show loading spinner while fetching profile
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 size={28} className="text-primary animate-spin" />
      </div>
    );
  }

  if (!profile?.data) {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }

  if (profile?.data?.role && roles.includes(profile?.data.role)) {
    return children;
  }

  return (
    <Navigate
      state={location.pathname}
      to={`/unauthorized-access?role=${profile?.data?.role}`}
    ></Navigate>
  );
};

export default ProtectedRoutes;
