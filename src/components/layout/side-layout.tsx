import { Link, Outlet } from "react-router-dom";
import SidebarItem from "../main/side-bar-item";
import { useSession } from "@/store/session";
import Loader from "../loader";
import RightPanel from "../main/right-side-bar";
import SidebarLogo from "@/assets/sidebar.png";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import defaultAvatar from "@/assets/default-avatar.jpg";

export default function SideLayout() {
  const session = useSession();
  const { data: profile } = useProfileData(session?.user.id);

  if (!session) return <Loader />;

  return (
    <div className="flex min-h-screen bg-[#F3F4F6] transition-colors duration-300 dark:bg-[#0F1113]">
      <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-indigo-50 bg-white shadow-sm transition-all dark:border-indigo-900/40 dark:bg-[#16181A]">
        <img
          src={SidebarLogo}
          alt="스토리메이커 로고"
          className="h-32 w-auto object-contain transition-transform hover:scale-105 dark:brightness-125"
        />

        <nav className="flex flex-1 flex-col gap-3 px-4 text-[16px] font-medium">
          <SidebarItem to="/main" label="🏠 메인 화면" />
          <SidebarItem to="/options" label="✨ 새 스토리" />
          <SidebarItem
            to={`/profile/${session.user.id}`}
            label="👤 내 프로필"
          />
          <SidebarItem to={`/stories`} label="🌐 공개된 스토리" />
        </nav>

        <Link to={`/profile/${session.user.id}`}>
          <div className="border-t border-indigo-50/80 p-5 dark:border-indigo-900/40">
            <div className="flex items-center gap-3 rounded-2xl bg-indigo-50 p-3 ring-1 ring-indigo-100/70 transition-colors dark:bg-[#1E2023] dark:ring-indigo-500/40">
              <img
                src={profile?.avatar_url || defaultAvatar}
                className="h-8 w-8 cursor-pointer rounded-full object-cover transition hover:shadow-md hover:shadow-black/30 dark:border dark:border-gray-700"
              />

              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-xs font-medium text-gray-400 dark:text-gray-500">
                  안녕하세요!
                </span>
                <span className="truncate text-sm font-bold text-gray-800 dark:text-gray-100">
                  {profile?.nickname || "사용자"}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </aside>

      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto min-h-screen max-w-350 px-8 py-10">
          <div className="min-h-[calc(100vh-80px)] overflow-hidden rounded-[48px] border border-indigo-50 bg-white p-12 text-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all dark:border-indigo-900/40 dark:bg-[#1C1E21] dark:text-gray-100 dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]"></div>
              <span className="text-[11px] font-semibold tracking-widest text-indigo-500/90 uppercase dark:text-indigo-300/90">
                Workspace
              </span>
            </div>

            <Outlet />
          </div>
        </div>
      </main>

      <div className="hidden w-80 py-10 pr-8 xl:block">
        <div className="sticky top-10">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
