import Loader from "@/components/loader";
import { useStoryInfinite } from "@/hooks/queries/use-story-infinity";
import { useSession } from "@/store/session";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

export default function StoryDetail({ userId }: { userId: string }) {
  const session = useSession();

  if (!session) return null;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useStoryInfinite(userId);

  const stories = data?.pages.flat() ?? [];
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <Loader />;

  if (!stories || stories.length === 0) {
    return (
      <div className="flex justify-center py-20 text-gray-400">
        아직 작성된 스토리가 없습니다.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      {stories.map((story) => (
        <Link to={`/result/${story.id}`} key={story.id}>
          <article className="m-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
            <div className="mb-3 flex flex-wrap justify-end gap-2 text-xs">
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
            <p className="line-clamp-10 leading-relaxed whitespace-pre-line text-gray-800">
              {story.content}
            </p>

            <div className="mt-2 text-right text-xs text-gray-400">
              클릭해서 전체 보기 →
            </div>

            <div className="mt-4 flex justify-end text-xs text-gray-400">
              {new Date(story.created_at).toLocaleDateString()}
            </div>
          </article>
        </Link>
      ))}
      {isFetchingNextPage && <Loader />}
      <div ref={ref}></div>
    </div>
  );
}
