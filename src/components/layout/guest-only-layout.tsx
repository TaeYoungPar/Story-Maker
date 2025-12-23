import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

export default function GuestOnlyLayout() {
  const session = useSession();
  if (session) return <Navigate to={"/"} replace={true} />;

  return (
    <div className="m-auto flex h-full w-full max-w-175">
      <Outlet />
    </div>
  );
}
