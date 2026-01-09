import Loader from "@/components/loader";
import { StoryCard } from "@/components/story/storyCard";
import { useStoryInfinite } from "@/hooks/queries/use-story-infinity";
import { useSession } from "@/store/session";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function StoryItems({ userId }: { userId: string }) {
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

  if (stories.length === 0) {
    return (
      <div className="flex justify-center py-20 text-gray-400">
        아직 작성된 스토리가 없습니다.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}

      {isFetchingNextPage && <Loader />}
      <div ref={ref} />
    </div>
  );
}
