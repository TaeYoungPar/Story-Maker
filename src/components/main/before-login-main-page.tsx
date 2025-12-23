import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeatureCard from "./feature-card";

export default function BeforeLoginMain() {
  return (
    <section className="flex flex-col items-center gap-24 py-24">
      <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl leading-tight font-bold">
          AI 쇼츠 스토리 빌더
        </h1>
        <p className="text-muted-foreground text-lg">
          몇 가지 선택만으로
          <br />
          쇼츠용 스토리를 빠르게 만들어보세요
        </p>

        <div className="mt-6 flex gap-4">
          <Button size="lg" asChild>
            <Link to="/sign-up">무료로 시작하기</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/sign-in">로그인</Link>
          </Button>
        </div>
      </div>

      <div className="grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        <FeatureCard
          title="빠른 생성"
          description="옵션 몇 개만 선택하면 스토리가 자동 생성됩니다."
        />
        <FeatureCard
          title="쇼츠 최적화"
          description="10초 · 20초 · 30초에 맞춘 구조로 생성됩니다."
        />
        <FeatureCard
          title="다양한 톤"
          description="공포, 감동, 유머 등 원하는 분위기를 선택하세요."
        />
      </div>
    </section>
  );
}
