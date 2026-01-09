import type { StroyExtraType } from "@/type";

export default function LikeViewComponent({
  story,
}: {
  story: StroyExtraType;
}) {
  return (
    <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
      <div className="flex gap-4">
        <span className="flex items-center gap-1">👀 {story.views}</span>
        <span
          className={`flex items-center gap-1 text-sm ${
            story.liked ? "text-red-500" : "text-gray-400"
          }`}
        >
          ❤️ {story.like_count}
        </span>
      </div>
    </div>
  );
}
