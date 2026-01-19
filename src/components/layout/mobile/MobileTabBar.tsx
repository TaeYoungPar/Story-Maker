import { Link, useLocation } from "react-router-dom";
import { Home, PlusSquare, Globe, User } from "lucide-react";
import { useSession } from "@/store/session";

export default function MobileTabBar() {
  const location = useLocation();
  const session = useSession();

  if (!session) return null;

  const tabs = [
    { to: "/main", label: "메인", icon: Home },
    { to: "/options", label: "새 스토리", icon: PlusSquare },
    { to: "/stories", label: "공개", icon: Globe },
    { to: `/profile/${session.user.id}`, label: "내 프로필", icon: User },
  ];

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 flex h-14 items-center justify-around border-t bg-white md:hidden dark:border-gray-800 dark:bg-[#16181A]">
      {tabs.map(({ to, label, icon: Icon }) => {
        const active = location.pathname.startsWith(to);

        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center justify-center gap-0.5 text-xs transition-colors ${
              active ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400"
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
