import { useParams, Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { useSession } from "@/store/session";
import { useStoryData } from "@/hooks/queries/use-story-data";
import { useToggleStory } from "@/hooks/mutations/story/use-toggle-story";
import { useCreateStoryView } from "@/hooks/mutations/story/use-create-stroy-view";
import { useEffect, useRef } from "react";
import { useToggleLike } from "@/hooks/mutations/story/use-toggle-like-story";
import Badge from "@/components/story/badge";
import Loader from "@/components/loader";
import Fallback from "@/components/fallback";
import defaultAvatar from "@/assets/default-avatar.jpg";

export default function ResultPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const parsedStoryId = Number(storyId);
  const session = useSession();

  if (!storyId) {
    return <Navigate to="/" replace />;
  }
  if (!session) return null;

  const { data: story, isLoading, error } = useStoryData(parsedStoryId);
  const { mutate: toggle, isPending } = useToggleStory(
    parsedStoryId,
    session.user.id,
  );

  const hasLoggedView = useRef(false);
  const { mutate: logView } = useCreateStoryView(
    parsedStoryId,
    session.user.id,
  );
  const { mutate: toggleLike } = useToggleLike();

  useEffect(() => {
    if (!story) return;

    if (hasLoggedView.current) return;

    logView();
    hasLoggedView.current = true;
  }, [story, logView]);

  if (isLoading) return <Loader />;
  if (error || !story) return <Fallback />;

  const isOwner = session?.user?.id === story.author_id;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <article className="rounded-[32px] border border-gray-100 bg-white p-5 shadow-sm transition-all sm:p-10 dark:border-white/5 dark:bg-[#16181A]">
        <div className="mb-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-black tracking-widest text-indigo-500 uppercase">
              AI Story Result
            </span>
            {isOwner && (
              <Button
                className="h-9 rounded-full px-5 text-xs font-bold transition-all hover:cursor-pointer active:scale-95"
                variant={story.is_public ? "outline" : "default"}
                disabled={isPending}
                onClick={() =>
                  toggle({ storyId: story.id, isPublic: story.is_public })
                }
              >
                {story.is_public ? "🔒 비공개 전환" : "🔓 공개 전환"}
              </Button>
            )}
          </div>

          <h1 className="text-2xl leading-tight font-black text-gray-900 sm:text-4xl dark:text-white">
            {story.title || "새로운 이야기의 탄생"}
          </h1>
        </div>

        <div className="mb-8 flex flex-wrap gap-2.5">
          <Badge color={story.is_public ? "green" : "red"}>
            {story.is_public ? "공개됨" : "비공개"}
          </Badge>
          <Badge color="gray">🎭 {story.genre}</Badge>
          <Badge color="gray">⏱️ {story.length}초</Badge>
          <Badge color="gray">🎬 {story.ending}</Badge>
        </div>

        <div className="mb-8 flex items-center gap-6 border-y border-gray-50 py-5 dark:border-white/5">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 sm:text-sm">
            <span className="text-lg">👀</span>
            <span className="text-gray-900 dark:text-gray-100">
              {story.views.toLocaleString()}
            </span>
            <span>조회수</span>
          </div>
          <button
            disabled={isPending}
            onClick={() =>
              toggleLike({
                storyId: story.id,
                userId: session!.user.id,
                liked: story.liked,
              })
            }
            className={`flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 hover:cursor-pointer sm:text-sm ${
              story.liked ? "text-red-500" : "text-gray-400 hover:text-red-400"
            }`}
          >
            <span className="text-xl">{story.liked ? "❤️" : "🤍"}</span>
            <span
              className={
                story.liked
                  ? "text-red-500"
                  : "text-gray-900 dark:text-gray-100"
              }
            >
              {story.like_count.toLocaleString()}
            </span>
            <span>좋아요</span>
          </button>
        </div>

        <div className="relative min-h-80 rounded-[24px] bg-gray-50/50 p-5 text-[17px] leading-[1.8] font-medium whitespace-pre-line text-gray-800 sm:p-10 dark:bg-white/5 dark:text-gray-200">
          <div className="absolute top-6 left-6 text-4xl font-black text-indigo-500/10">
            "
          </div>
          <div className="relative z-10">{story.content}</div>
          <div className="absolute right-6 bottom-6 text-4xl font-black text-indigo-500/10">
            "
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-[13px] font-bold text-gray-400">
          <Link
            to={`/profile/${story.author_id}`}
            className="flex items-center gap-3"
          >
            <div className="w-8 shrink-0 sm:w-7">
              <img
                src={story.author?.avatar_url || defaultAvatar}
                alt="author avatar"
                className="aspect-square w-full rounded-full bg-indigo-500/10 object-cover"
              />
            </div>
            <span>작성자: {story.author?.nickname ?? "익명"}</span>
          </Link>
          <span>{new Date(story.created_at).toLocaleDateString()}</span>
        </div>
      </article>
    </div>
  );
}
