import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { toast } from "sonner";

import type { StoryView } from "@/type";
import { useSession } from "@/store/session";
import { useDeleteStory } from "@/hooks/mutations/story/use-delete-story";
import { useOpenAlertModal } from "@/store/alert-modal";
import LikeViewComponent from "./like-view-com";
import Badge from "./badge";

export function StoryCard({ story }: { story: StoryView }) {
  const session = useSession();
  const { mutate: deleteStory } = useDeleteStory(story.author_id);
  const openAlert = useOpenAlertModal();

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:border-gray-800 dark:bg-[#1C1E21]">
      {story.author_id === session?.user.id && (
        <button
          className="absolute top-3 right-3 z-10 rounded-full bg-white/80 p-1.5 text-gray-400 backdrop-blur-md transition hover:bg-red-50 hover:text-red-500 dark:bg-black/50"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openAlert({
              title: "스토리 삭제",
              description: "이 이야기를 영구적으로 삭제하시겠습니까?",
              onPositive: () => deleteStory(story.id),
            });
          }}
        >
          <X size={16} />
        </button>
      )}

      <Link to={`/story/${story.id}`} className="flex h-full flex-col">
        <CardHeader className="flex flex-row flex-wrap gap-2 p-6 pb-0">
          <Badge color={story.is_public ? "green" : "red"}>
            {story.is_public ? "공개" : "비공개"}
          </Badge>
          <Badge color="gray">{story.genre}</Badge>
          <Badge color="gray">⏱️ {story.length}s</Badge>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col p-6">
          <div className="relative mb-4 flex-1">
            <p className="line-clamp-6 text-base leading-relaxed whitespace-pre-line text-gray-700 dark:text-gray-300">
              {story.content}
            </p>

            <div className="absolute bottom-0 h-12 w-full bg-linear-to-t from-white to-transparent dark:from-[#1C1E21]" />
          </div>

          <div className="mt-auto border-t border-gray-50 pt-4 dark:border-gray-800/50">
            <div className="flex items-center justify-between">
              <LikeViewComponent
                story={{
                  like_count: story.like_count,
                  liked: story.liked,
                  views: story.views,
                }}
              />
              <span className="text-[11px] font-medium text-gray-400">
                {new Date(story.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="mt-3 text-center opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-xs font-bold text-indigo-500">
                전체 읽기 →
              </span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
