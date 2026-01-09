import { StoryCard } from "@/components/story/storyCard";
import { usePublicStoriesInfinity } from "@/hooks/queries/use-public-story-infinity";
import { useSession } from "@/store/session";

export default function PublicFeedPage() {
  const session = useSession();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePublicStoriesInfinity(session!.user.id);

  const stories = data?.pages.flat() ?? [];

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4 p-6">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "로딩 중..." : "더 보기"}
        </button>
      )}
    </div>
  );
}
