import { Outlet } from "react-router-dom";
import SidebarItem from "../main/side-bar-item";
import { useSession } from "@/store/session";
import Loader from "../loader";

export default function SideLayout() {
  const session = useSession();

  if (!session) return <Loader />;

  return (
    <div className="mx-auto flex min-h-screen">
      <aside className="sticky top-0 h-[calc(100vh-5.25rem)] w-60 md:block">
        <div className="px-6 py-5 text-lg font-bold">쇼츠 메이커</div>

        <nav className="flex flex-col gap-1 px-3 text-lg">
          <SidebarItem to="/main" label="메인 화면" />
          <SidebarItem to="/options" label="새 스토리" />
          <SidebarItem to={`/profile/${session.user.id}`} label="내 프로필" />
        </nav>
      </aside>

      <main className="flex-1 border-x">
        <Outlet />
      </main>
    </div>
  );
}
