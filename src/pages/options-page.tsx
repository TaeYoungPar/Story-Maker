import OptionButton from "@/components/option/option-button";
import StoryLoadingModal from "@/components/story-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateStory } from "@/hooks/mutations/story/use-create-story";
import { useShortsOptions } from "@/store/options";
import type { ShortsEnding, ShortsGenre, ShortsLength } from "@/type";
import { toast } from "sonner";

export default function OptionsPage() {
  const LENGTHS: ShortsLength[] = ["10", "20", "30"];
  const GENRES: ShortsGenre[] = ["공포", "감동", "유머"];
  const ENDINGS: ShortsEnding[] = ["반전", "교훈", "열린 결말"];

  const { options, setLength, setGenre, setEnding } = useShortsOptions();
  const { mutate, isPending } = useCreateStory({
    onError: () => {
      toast.error("스토리 생성에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-10 py-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100">
          AI 쇼츠 스토리 빌더
        </h1>
        <p className="font-medium text-gray-500 dark:text-gray-400">
          원하는 옵션을 조합해 단 하나뿐인 이야기를 만들어보세요.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <span className="text-lg">⏱️</span>
            <h2 className="font-bold text-gray-700 dark:text-gray-300">
              쇼츠 길이
            </h2>
          </div>
          <Card className="overflow-hidden border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-black/10">
            <CardContent className="p-4">
              <div className="flex gap-3">
                {LENGTHS.map((length) => (
                  <OptionButton
                    key={length}
                    label={`${length}초`}
                    selected={options.length === length}
                    onClick={() => setLength(length)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <span className="text-lg">🎭</span>
            <h2 className="font-bold text-gray-700 dark:text-gray-300">
              스토리 톤
            </h2>
          </div>
          <Card className="overflow-hidden border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-black/10">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-3">
                {GENRES.map((genre) => (
                  <OptionButton
                    key={genre}
                    label={genre}
                    selected={options.genre === genre}
                    onClick={() => setGenre(genre)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <span className="text-lg">🎬</span>
            <h2 className="font-bold text-gray-700 dark:text-gray-300">
              엔딩 스타일
            </h2>
          </div>
          <Card className="overflow-hidden border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-black/10">
            <CardContent className="p-4">
              <div className="flex gap-3">
                {ENDINGS.map((ending) => (
                  <OptionButton
                    key={ending}
                    label={ending}
                    selected={options.ending === ending}
                    onClick={() => setEnding(ending)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
      <div className="pt-4">
        <Button
          size="lg"
          className="h-16 w-full rounded-2xl bg-indigo-600/90 text-lg font-black text-white shadow-xl shadow-violet-100 transition-all hover:cursor-pointer hover:bg-indigo-600 active:scale-[0.98] dark:shadow-none"
          onClick={() => mutate(options)}
          disabled={isPending}
        >
          {isPending ? "🪄 스토리 생성 중..." : "🪄 스토리 생성하기"}
        </Button>
        <p className="mt-4 text-center text-xs font-medium text-gray-400">
          💡 팁: 짧은 스토리는 반전이 있을수록 조회수가 높아요!
        </p>
      </div>

      {isPending && <StoryLoadingModal />}
    </div>
  );
}
