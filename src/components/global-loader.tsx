import logo from "@/assets/logo.png";
export default function GlobalLoader() {
  return (
    <div className="bg-muted flex h-screen w-screen flex-col items-center justify-center">
      <div className="mb-15 flex animate-bounce items-center gap-4">
        <img
          src={logo}
          alt="Shorts Maker 서비스의 로고"
          className="h-30 w-30 rounded-full"
        />
        <div className="text-2xl font-bold">Shorts Maker </div>
      </div>
    </div>
  );
}
