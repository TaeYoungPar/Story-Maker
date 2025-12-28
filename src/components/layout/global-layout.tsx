import { Outlet, Link } from "react-router-dom";
import { useSession } from "@/store/session";
import ThemeButton from "./header/theme-button";
import ProfileButton from "./header/profile-button";

export default function GlobalLayout() {
  const session = useSession();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="h-15 border-b">
        <div className="m-auto flex h-full w-full max-w-175 justify-between px-4">
          <Link
            to="/"
            className="flex items-center justify-center text-lg font-bold"
          >
            StoryMaker
          </Link>
          <div className="flex items-center gap-5">
            {session && <ProfileButton />}
            <ThemeButton />
          </div>
        </div>
      </header>

      <main className="w-full flex-1 border-x">
        <Outlet />
      </main>

      <footer className="border-t">
        <div className="text-muted-foreground mx-auto max-w-6xl px-6 py-8 text-sm">
          <div className="flex items-center justify-center sm:flex-row">
            <span>© {new Date().getFullYear()} StoryMaker</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
