import { Outlet } from "react-router-dom";
import { useSession } from "@/store/session";
import ThemeButton from "./header/theme-button";
import ProfileButton from "./header/profile-button";
import Footer from "./footer";
import ScrollToTop from "../scroll-to-top";

export default function GlobalLayout() {
  const session = useSession();
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-[#0F1113]">
      <ScrollToTop />

      <header className="h-16 border-b border-gray-100 dark:border-white/5">
        <div className="mx-auto flex h-full w-full items-center justify-end px-10 pr-20">
          <div className="flex items-center gap-4">
            {session && (
              <div className="flex h-10 w-10 items-center justify-center">
                <ProfileButton />
              </div>
            )}
            <div className="flex h-10 w-10 items-center justify-center">
              <ThemeButton />
            </div>
          </div>
        </div>
      </header>

      <main className="">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
