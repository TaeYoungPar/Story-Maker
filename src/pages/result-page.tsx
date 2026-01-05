import { useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { useSession } from "@/store/session";
import { useStoryData } from "@/hooks/queries/use-story-data";
import { useToggleStory } from "@/hooks/mutations/story/use-toggle-story";
import { useCreateStoryView } from "@/hooks/mutations/story/use-create-stroy-view";
import { useEffect, useRef } from "react";
import { useToggleLike } from "@/hooks/mutations/story/use-toggle-like-story";

export default function ResultPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const parsedStoryId = Number(storyId);
  const session = useSession();

  if (!storyId) {
    return <Navigate to="/" replace />;
  }

  const { data: story, isLoading, error } = useStoryData(parsedStoryId);
  const { mutate: toggle, isPending } = useToggleStory(parsedStoryId);

  const hasLoggedView = useRef(false);
  const { mutate: logView } = useCreateStoryView(parsedStoryId);
  const { mutate: toggleLike, isPending: likeIsPending } = useToggleLike();

  useEffect(() => {
    if (!story) return;

    if (hasLoggedView.current) return;

    logView();
    hasLoggedView.current = true;
  }, [story, logView]);

  if (isLoading)
    return <div className="py-20 text-center text-gray-400">불러오는 중…</div>;
  if (error || !story)
    return <div className="py-20 text-center text-gray-400">접근 불가</div>;

  const isOwner = session?.user?.id === story.author_id;

  return (
    <div className="mx-auto max-w-xl p-6">
      <article className="rounded-xl border bg-white p-6 shadow-sm">
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

        <div className="mb-3 flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">👀 {story.views}</span>
          <Button
            variant={"ghost"}
            disabled={isPending}
            onClick={() =>
              toggleLike({
                storyId: story.id,
                userId: session!.user.id,
                liked: story.liked,
              })
            }
            className={`flex cursor-pointer items-center gap-1 text-sm transition ${
              story.liked ? "text-red-500" : "text-gray-400 hover:text-red-400"
            }`}
          >
            ❤️ {story.like_count}
          </Button>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4 text-sm leading-relaxed whitespace-pre-line text-gray-800">
          {story.content}
        </div>

        <div className="mt-4 text-right text-xs text-gray-400">
          {new Date(story.created_at).toLocaleDateString()}
        </div>
      </article>
    </div>
  );
}
