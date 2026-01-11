import { Link } from "react-router-dom";
import { RecommendedKeywords } from "./recomment-keyword";

export default function RightPanel() {
  return (
    <div className="flex flex-col gap-6">
      <RecommendedKeywords />

      <div className="rounded-2xl bg-indigo-600 p-6 text-white shadow-lg shadow-indigo-200 dark:shadow-none">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg">💡</span>
          <h3 className="text-sm font-bold opacity-90">제작 팁</h3>
        </div>
        <p className="text-sm leading-relaxed font-medium">
          짧은 쇼츠 스토리는{" "}
          <span className="font-black text-amber-300 underline decoration-amber-300/50 underline-offset-4">
            반전
          </span>
          이 있을수록 사람들의 시선을 더 오래 붙잡을 수 있어요.
        </p>
      </div>

      <Link
        to="https://www.youtube.com/@shortsgamja"
        target="_blank"
        className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-gray-400 transition-all hover:text-red-500"
      >
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>
        유튜브에서 실제 사례 보기 →
      </Link>
    </div>
  );
}
