import { selectCurrentUser } from "@/redux/features/auth/AuthSlice";
import { useAppSelector } from "@/redux/hook";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type TProtectedRoutesProps = {
  children: ReactNode;
  roles: string[];
};

const ProtectedRoutes = ({ children, roles }: TProtectedRoutesProps) => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  if (!user) {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }

  if (user?.role && roles.includes(user.role)) {
    return children;
  }

  return (
    <Navigate
      state={location.pathname}
      to={`/unauthorized-access?role=${user?.role}`}
    ></Navigate>
  );
};

export default ProtectedRoutes;
