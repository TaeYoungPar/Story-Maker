import { Outlet, Link } from "react-router-dom";
import { useSession } from "@/store/session";
import ThemeButton from "./header/theme-button";
import ProfileButton from "./header/profile-button";
import Footer from "./footer";
import ScrollToTop from "../scroll-to-top";

export default function GlobalLayout() {
  const session = useSession();
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <header className="h-15 border-b">
        <div className="m-auto flex h-full w-full justify-between px-10 pr-20">
          <Link
            to="/"
            className="flex items-center justify-center text-lg font-bold"
          >
            StoryMaker
          </Link>
          <div className="flex items-center gap-5">
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

      <main className="h-full w-full flex-1 border-x">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
