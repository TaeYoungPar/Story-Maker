import RecentWork from "../main/recent-work";

export default function RightPanel() {
  return (
    <div className="sticky top-0 flex h-[calc(100vh-5.25rem)] flex-1 flex-col items-center px-4">
      <RecentWork />

      <div className="bg-muted mt-10 w-full max-w-md rounded-lg p-4 text-sm">
        💡 팁
        <p className="mt-2 leading-relaxed">
          짧은 스토리는 반전이 있을수록 조회수가 높아요.
        </p>
      </div>
    </div>
  );
}
