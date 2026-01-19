import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import googleLogo from "@/assets/google.png";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error";
import useSignWithPassword from "@/hooks/mutations/auth/use-sign-in.-with-password";
import useSignWithOAuth from "@/hooks/mutations/auth/use-sign-in-with-oauth-page";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignWithPassword({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, { position: "top-center" });
        setPassword("");
      },
    });

  const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } =
    useSignWithOAuth({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, { position: "top-center" });
      },
    });

  const handleSignInWithPasswordClick = () => {
    if (!email.trim())
      return toast.error("이메일을 입력해주세요.", { position: "top-center" });
    if (!password.trim())
      return toast.error("비밀번호를 입력해주세요.", {
        position: "top-center",
      });

    signInWithPassword({ email, password });
  };

  const handleSignWithGoogleClick = () => {
    signInWithOAuth("google");
  };

  const isPending = isSignInWithOAuthPending || isSignInWithPasswordPending;

  return (
    <div className="flex w-full items-center justify-center px-4">
      <div className="animate-in fade-in slide-in-from-bottom-4 w-full max-w-110 duration-500">
        <div className="my-8 text-center">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            다시 만나 반가워요!
          </h1>
          <p className="text-muted-foreground mt-3">
            로그인하고 나만의 AI 쇼츠를 계속 만들어보세요
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm dark:border-gray-800 dark:bg-[#16181A]">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                이메일 주소
              </label>
              <Input
                disabled={isPending}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 px-4 transition-all focus:bg-white dark:border-gray-700 dark:bg-gray-900/50"
                type="email"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  비밀번호
                </label>
                <Link
                  to="/forget-password"
                  className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  비밀번호 분실?
                </Link>
              </div>
              <Input
                disabled={isPending}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 px-4 transition-all focus:bg-white dark:border-gray-700 dark:bg-gray-900/50"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-3 pt-2">
              <Button
                disabled={isPending}
                onClick={handleSignInWithPasswordClick}
                className="h-12 w-full cursor-pointer rounded-xl bg-indigo-600 text-base font-bold transition-all hover:bg-indigo-700 active:scale-[0.99]"
              >
                {isSignInWithPasswordPending ? "로그인 중..." : "로그인"}
              </Button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-100 dark:border-gray-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="text-muted-foreground bg-white px-2 dark:bg-[#16181A]">
                    또는
                  </span>
                </div>
              </div>

              <Button
                disabled={isPending}
                onClick={handleSignWithGoogleClick}
                className="h-12 w-full cursor-pointer rounded-xl border-gray-200 bg-white font-bold text-gray-700 transition-all hover:bg-gray-50 active:scale-[0.99] dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800"
                variant="outline"
              >
                <img src={googleLogo} className="mr-2 h-4 w-4" alt="Google" />
                Google 계정으로 로그인
              </Button>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6 text-center dark:border-gray-800">
            <p className="text-sm text-gray-500">
              아직 계정이 없으신가요?{" "}
              <Link
                to="/sign-up"
                className="font-semibold text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
              >
                회원가입하기
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
