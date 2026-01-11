import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";
import { useLocation } from "react-router-dom";

export default function GuestOnlyLayout() {
  const session = useSession();
  const { pathname } = useLocation();

  if (session) return <Navigate to="/main" replace />;

  const isRoot = pathname === "/";

  return (
    <div
      className={`m-auto flex h-full w-full py-4 ${isRoot ? "justify-center" : "max-w-175"}`}
    >
      <Outlet />
    </div>
  );
}
