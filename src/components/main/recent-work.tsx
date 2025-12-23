import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function RecentWork() {
  return (
    <div className="mt-10 w-full max-w-md rounded-xl border p-6">
      <h2 className="text-muted-foreground mb-4 text-sm font-semibold">
        최근 작업
      </h2>

      <div className="flex items-center justify-between">
        <span className="text-sm">최근 생성한 스토리</span>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/story">이어서 하기</Link>
        </Button>
      </div>
    </div>
  );
}
