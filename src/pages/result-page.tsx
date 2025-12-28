import { useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { useSession } from "@/store/session";
import { useStoryData } from "@/hooks/queries/use-story-data";
import { useToggleStory } from "@/hooks/mutations/story/use-toggle-story";

export default function ResultPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const parsedStoryId = Number(storyId);
  const session = useSession();

  if (!storyId) {
    return <Navigate to="/" replace />;
  }

  const { data: story, isLoading, error } = useStoryData(parsedStoryId);
  const { mutate: toggle, isPending } = useToggleStory(parsedStoryId);

  if (isLoading)
    return <div className="py-20 text-center text-gray-400">불러오는 중…</div>;
  if (error || !story)
    return <div className="py-20 text-center text-gray-400">접근 불가</div>;

  const isOwner = session?.user?.id === story.author_id;

  return (
    <div className="mx-auto max-w-xl p-6">
      <article className="rounded-xl border bg-white p-6 shadow-sm">
        {/* 헤더 */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">생성된 스토리</h1>

          {isOwner && (
            <Button
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={() =>
                toggle({
                  storyId: story.id,
                  isPublic: story.is_public,
                })
              }
            >
              {story.is_public ? "비공개로 전환" : "공개로 전환"}
            </Button>
          )}
        </div>

        {/* 메타 정보 */}
        <div className="mb-4 flex flex-wrap gap-2 text-xs">
          {story.is_public ? (
            <span className="rounded-full bg-green-100 px-2 py-1 text-green-700">
              공개
            </span>
          ) : (
            <span className="rounded-full bg-red-100 px-2 py-1 text-red-600">
              비공개
            </span>
          )}

          <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-600">
            {story.genre}
          </span>

          <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-600">
            {story.length}초
          </span>

          <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-600">
            {story.ending}
          </span>
        </div>

        {/* 본문 */}
        <div className="rounded-lg border bg-gray-50 p-4 text-sm leading-relaxed whitespace-pre-line text-gray-800">
          {story.content}
        </div>

        {/* 푸터 */}
        <div className="mt-4 text-right text-xs text-gray-400">
          {new Date(story.created_at).toLocaleDateString()}
        </div>
      </article>
    </div>
  );
}
