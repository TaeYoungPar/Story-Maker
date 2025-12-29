import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSession } from "@/store/session";
import { useStoryByUserIdData } from "@/hooks/queries/use-story-all-data";
import Loader from "../loader";

export default function RecentWork() {
  const session = useSession();
  if (!session) return null;

  const { data, isPending } = useStoryByUserIdData(session.user.id);

  if (isPending) return <Loader />;

  console.log(data);
  return (
    <div className="mt-10 w-full max-w-md rounded-xl border p-6">
      <h2 className="text-muted-foreground mb-4 text-sm font-semibold">
        최근 작업
      </h2>

      {!data || data.length === 0 ? (
        <div className="flex items-center justify-between">
          <span className="text-gray-400">
            아직 작성된 스토리가 없습니다.
            <Button variant="ghost" size="sm" asChild>
              <Link to={"/options"}>생성하기</Link>
            </Button>
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-sm">최근 생성한 스토리</span>
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/result/${data[0].id}`}>확인하기</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
