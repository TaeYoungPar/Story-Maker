import { Outlet } from "react-router-dom";
import SidebarItem from "../main/side-bar-item";
import { useSession } from "@/store/session";
import Loader from "../loader";
import RightPanel from "../main/right-side-bar";
import SidebarLogo from "@/assets/sidebar.png";

export default function SideLayout() {
  const session = useSession();

  if (!session) return <Loader />;

  return (
    <div className="mx-auto flex min-h-screen">
      <aside className="sticky top-0 h-[calc(100vh-5.25rem)] w-60 md:block">
        <div className="flex justify-center">
          <img
            src={SidebarLogo}
            alt="스토리메이커 로고"
            className="h-28 max-w-full object-contain"
          />
        </div>

        <nav className="flex flex-col gap-1 px-3 text-lg">
          <SidebarItem to="/main" label="메인 화면" />
          <SidebarItem to="/options" label="새 스토리" />
          <SidebarItem to={`/profile/${session.user.id}`} label="내 프로필" />
          <SidebarItem to={`/stories`} label="공개된 스토리" />
        </nav>
      </aside>

      <main className="max-w-7xl flex-2 border-x">
        <Outlet />
      </main>

      <RightPanel />
    </div>
  );
}
