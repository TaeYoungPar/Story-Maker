// src/components/story/story-card-with-delete.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { toast } from "sonner";

import type { StoryView } from "@/type";
import { useSession } from "@/store/session";
import { useDeleteStory } from "@/hooks/mutations/story/use-delete-story";
import { useOpenAlertModal } from "@/store/alert-modal";
import LikeViewComponent from "./like-view-com";

export function StoryCard({ story }: { story: StoryView }) {
  const session = useSession();
  const { mutate: deleteStory } = useDeleteStory(story.author_id);
  const openAlert = useOpenAlertModal();

  return (
    <Card className="relative cursor-pointer rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg">
      {story.author_id === session?.user.id && (
        <button
          className="absolute top-1 right-1 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-red-500"
          aria-label="삭제"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            openAlert({
              title: "스토리 삭제",
              description: "정말로 삭제하시겠습니까?",
              onPositive: () => {
                deleteStory(story.id, {
                  onSuccess: () =>
                    toast.success("삭제 완료", { position: "top-center" }),
                  onError: () =>
                    toast.error("삭제 실패", { position: "top-center" }),
                });
              },
            });
          }}
        >
          <X size={16} />
        </button>
      )}

      <Link to={`/story/${story.id}`}>
        <CardHeader className="my-2 flex flex-wrap justify-end gap-2 text-xs">
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
        </CardHeader>

        <CardContent>
          <p className="line-clamp-10 leading-relaxed whitespace-pre-line text-gray-800">
            {story.content}
          </p>

          <div className="mt-2 text-right text-xs text-gray-400">
            클릭해서 전체 보기 →
          </div>

          <LikeViewComponent
            story={{
              like_count: story.like_count,
              liked: story.liked,
              views: story.views,
            }}
          />

          <div className="mt-4 flex justify-end text-xs text-gray-400">
            {new Date(story.created_at).toLocaleDateString()}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
