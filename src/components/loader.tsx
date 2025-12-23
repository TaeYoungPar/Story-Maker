import { LoaderCircleIcon } from "lucide-react";

export default function Loader() {
  return (
    <div className="text-muted-foreground flex-ocl flex items-center justify-center gap-5">
      <LoaderCircleIcon className="animate-spin" />
      <div className="text-sm">데이터를 불러오는 중 입니다.</div>
    </div>
  );
}
