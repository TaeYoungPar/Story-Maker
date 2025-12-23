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

  if (isLoading) return <div className="p-6 text-center">불러오는 중...</div>;
  if (error || !story) return <div className="p-6 text-center">접근 불가</div>;

  const isOwner = session?.user?.id === story.author_id;

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">생성된 스토리</h1>

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

      <div className="text-muted-foreground text-sm">
        상태: {story.is_public ? "공개" : "비공개"}
      </div>

      <div className="rounded-md border p-4 whitespace-pre-line">
        {story.content}
      </div>
    </div>
  );
}
