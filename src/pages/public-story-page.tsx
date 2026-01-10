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
    <div className="mx-auto flex max-w-xl flex-col gap-4 p-6">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}

      {isFetchingNextPage && <Loader />}
      <div ref={ref}></div>
    </div>
  );
}
