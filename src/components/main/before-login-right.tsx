export default function BeforeLoginRight() {
  return (
    <div className="animate-bounce-slow relative flex justify-center">
      <div className="relative h-140 w-75 overflow-hidden rounded-[40px] border-10 border-slate-900 bg-black shadow-2xl">
        <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
          <div className="rounded bg-red-600 px-2 py-1 text-[10px] font-black text-white italic">
            Shorts
          </div>
        </div>

        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-gray-800 to-black p-6 text-center">
          <p className="text-sm leading-relaxed font-medium text-white/70">
            AI가 생성한
            <br />
            <span className="text-lg font-bold text-white">"반전 소름 썰"</span>
            <br />
            재생 중...
          </p>
        </div>

        <div className="absolute right-3 bottom-24 flex flex-col gap-5 text-[20px] text-white/80">
          <div>❤️</div>
          <div>💬</div>
          <div>📤</div>
        </div>

        <div className="absolute bottom-0 h-1.5 w-full bg-red-600" />
      </div>
    </div>
  );
}
