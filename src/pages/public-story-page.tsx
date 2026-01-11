import Loader from "@/components/loader";
import { StoryCard } from "@/components/story/storyCard";
import { usePublicStoriesInfinity } from "@/hooks/queries/use-public-story-infinity";
import { useSession } from "@/store/session";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function PublicFeedPage() {
  const session = useSession();
  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    usePublicStoriesInfinity(session!.user.id);

  const stories = data?.pages.flat() ?? [];
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto max-w-5xl p-4">
      <div className="mb-10 px-2">
        <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100">
          공개된 스토리 🌐
        </h1>
        <p className="mt-2 font-medium text-gray-500 dark:text-gray-400">
          다른 작가들이 생성한 창의적인 이야기들을 만나보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {stories.map((story) => (
          <div key={story.id} className="h-full">
            <StoryCard story={story} />
          </div>
        ))}
      </div>

      <div
        className="mt-12 flex flex-col items-center justify-center py-10"
        ref={ref}
      >
        {isFetchingNextPage ? (
          <div className="flex flex-col items-center gap-3">
            <Loader />
            <span className="animate-pulse text-sm font-medium text-gray-400">
              새로운 이야기를 불러오는 중...
            </span>
          </div>
        ) : (
          !hasNextPage &&
          stories.length > 0 && (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <span className="text-2xl">✨</span>
              <p className="text-sm font-medium">
                모든 스토리를 다 읽으셨습니다!
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
