import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RecentWork from "./recent-work";

export default function DashboardMain() {
  return (
    <section className="flex min-h-screen flex-col items-center gap-12 bg-[#F8FAFC] px-6 py-20 dark:bg-[#0F1113]">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-500 dark:text-indigo-400">
          ✨ AI SHORTS GENERATOR
        </div>

        <h1 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl dark:text-white">
          오늘은 무엇을{" "}
          <span className="text-indigo-600 dark:text-indigo-500">
            만들까요?
          </span>
        </h1>

        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
          바로 스토리를 생성해보세요
        </p>
      </div>

      <Button
        size="lg"
        className="h-16 rounded-2xl bg-indigo-600 px-10 text-xl font-bold text-white shadow-xl shadow-indigo-200 transition-all hover:scale-105 hover:bg-indigo-700 active:scale-95 dark:shadow-none"
        asChild
      >
        <Link to="/options" className="flex items-center gap-3">
          <span>✨</span> 새 스토리 만들기
        </Link>
      </Button>

      <div className="mt-8 w-full max-w-2xl">
        <div className="rounded-[24px] border border-gray-100 bg-white p-2 shadow-sm dark:border-white/5 dark:bg-[#16181A]">
          <RecentWork />
        </div>
      </div>
    </section>
  );
}
