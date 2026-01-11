import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/main/feature-card";
import BeforeLoginRight from "@/components/main/before-login-right";

export default function BeforeLoginMain() {
  return (
    <div className="flex w-full flex-col items-center gap-5 md:flex-row md:justify-between md:px-8">
      <section className="flex-1 bg-slate-50 py-24 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-24 text-center">
          <div className="flex max-w-4xl flex-col items-center gap-8">
            <div className="animate-fade-in inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-600 backdrop-blur-md dark:text-indigo-400">
              <span className="mr-2">✨</span> AI Shorts Builder v1.0
            </div>

            <h1 className="text-5xl font-black tracking-tight text-gray-900 md:text-7xl dark:text-white">
              <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI
              </span>
              로 터지는 <br /> 쇼츠 스토리 만들기
            </h1>

            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
              아이디어만 있으면 충분합니다. AI가 감정선, 반전, 분위기까지 고려한
              최적의 쇼츠 스토리를 10초 만에 설계해 드립니다.
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                asChild
                className="h-16 rounded-2xl bg-indigo-600 px-10 text-lg font-bold shadow-lg shadow-indigo-500/40 transition-all hover:scale-105 hover:bg-indigo-700 active:scale-95"
              >
                <Link to="/sign-up">지금 무료로 시작하기</Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-16 rounded-2xl border-2 px-10 text-lg font-bold transition-all hover:scale-105 dark:hover:bg-gray-800"
              >
                <Link to="/sign-in">로그인</Link>
              </Button>
            </div>
          </div>

          <div className="relative grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="absolute inset-0 -z-10 bg-indigo-200/50 blur-3xl dark:bg-indigo-900/10" />

            <FeatureCard
              title="⚡️ 빠른 생성"
              description="복잡한 기획 없이 클릭 몇 번으로 스토리가 완성됩니다."
            />
            <FeatureCard
              title="🎬 쇼츠 최적화"
              description="알고리즘이 좋아하는 10·20·30초 황금 템포 구성."
            />
            <FeatureCard
              title="🎭 다양한 분위기"
              description="공포부터 코믹까지, 원하는 장르를 완벽하게 구현."
            />
          </div>
        </div>
      </section>

      <BeforeLoginRight />
    </div>
  );
}
