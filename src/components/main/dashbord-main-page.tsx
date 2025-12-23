import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RecentWork from "./recent-work";

export default function DashboardMain() {
  return (
    <section className="flex flex-col items-center gap-16 py-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold">오늘은 무엇을 만들까요?</h1>
        <p className="text-muted-foreground">바로 스토리를 생성해보세요</p>
      </div>

      <Button size="lg" asChild>
        <Link to="/options">+ 새 스토리 만들기</Link>
      </Button>

      <RecentWork />
    </section>
  );
}
