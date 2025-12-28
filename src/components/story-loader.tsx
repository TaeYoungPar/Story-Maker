import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function StoryLoadingModal() {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40">
      <Card className="flex flex-col items-center gap-4 p-6">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-muted-foreground text-sm">
          스토리를 생성 중입니다...
        </p>
      </Card>
    </div>
  );
}
