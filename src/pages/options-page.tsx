import OptionButton from "@/components/option/option-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useShortsOptions } from "@/store/options";
import type { ShortsEnding, ShortsGenre, ShortsLength } from "@/type";

export default function OptionsPage() {
  const LENGTHS: ShortsLength[] = ["10", "20", "30"];
  const GENRES: ShortsGenre[] = ["공포", "감동", "유머"];
  const ENDINGS: ShortsEnding[] = ["반전", "교훈", "열린 결말"];

  const { options, setLength, setGenre, setEnding } = useShortsOptions();

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-8 px-4 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">AI 쇼츠 스토리 빌더</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          옵션을 선택하고 바로 스토리를 만들어보세요
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 p-6">
          <div className="font-semibold">쇼츠 길이</div>
          <div className="flex gap-2">
            <div className="flex gap-2">
              {LENGTHS.map((length) => (
                <OptionButton
                  key={length}
                  label={`${length}초`}
                  selected={options.length === length}
                  onClick={() => setLength(length)}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-4 p-6">
          <div className="font-semibold">톤</div>
          <div className="flex flex-wrap gap-2">
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

      <Card>
        <CardContent className="flex flex-col gap-4 p-6">
          <div className="font-semibold">엔딩</div>
          <div className="flex gap-2">
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

      <Button size="lg" className="mt-4 w-full">
        스토리 생성하기
      </Button>
    </div>
  );
}
