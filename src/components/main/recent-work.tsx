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

  return (
    <div className="w-full p-6">
      {!data || data.length === 0 ? (
        <div className="flex items-center justify-between text-gray-500">
          <span>아직 작성된 스토리가 없습니다.</span>
          <Button
            variant="link"
            className="text-indigo-600 dark:text-indigo-400"
            asChild
          >
            <Link to="/options">첫 스토리 만들기</Link>
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[16px] font-bold text-gray-900 dark:text-gray-100">
              최근 생성한 스토리
            </span>
            <p className="text-sm text-gray-500 italic dark:text-gray-400">
              "조회수를 높이는 반전 스토리를 생성했습니다"
            </p>
          </div>

          <Button
            variant="ghost"
            className="font-bold text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
            asChild
          >
            <Link to={`/story/${data[0].id}`}>확인하기</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
