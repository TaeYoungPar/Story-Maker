import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/mutations/auth/use-sign-up";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const { mutate: signUp, isPending: isSignUpPending } = useSignUp({
    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다!", { position: "top-center" });
    },
    onError: (error) => {
      toast.error(generateErrorMessage(error), { position: "top-center" });
    },
  });

  const handleSignUpOnClick = () => {
    if (!email.trim())
      return (
        toast.error("이메일을 입력해주세요."),
        { position: "top-center" }
      );
    if (!isValidEmail(email))
      return toast.error("올바른 이메일 형식이 아닙니다.", {
        position: "top-center",
      });
    if (!password.trim())
      return toast.error("비밀번호를 입력해주세요.", {
        position: "top-center",
      });
    if (!passwordConfirm.trim())
      return toast.error("비밀번호 확인을 입력해주세요.", {
        position: "top-center",
      });
    if (password !== passwordConfirm) {
      toast.error("비밀번호가 일치하지 않습니다.", { position: "top-center" });
      setPassword("");
      setPasswordConfirm("");
      return;
    }
    signUp({ email, password });
  };

  return (
    <div className="flex w-full items-center justify-center px-4 dark:bg-[#0F1113]">
      <div className="w-full max-w-110">
        <div className="my-8 text-center">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            계정 만들기
          </h1>
          <p className="text-muted-foreground mt-3">
            아이디어를 쇼츠로 바꾸는 가장 빠른 방법
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm dark:border-gray-800 dark:bg-[#16181A]">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                이메일 주소
              </label>
              <Input
                disabled={isSignUpPending}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 px-4 transition-all focus:bg-white dark:border-gray-700 dark:bg-gray-900/50"
                type="email"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                비밀번호
              </label>
              <Input
                disabled={isSignUpPending}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 px-4 transition-all focus:bg-white dark:border-gray-700 dark:bg-gray-900/50"
                type="password"
                placeholder="6자 이상 입력"
              />
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                비밀번호 확인
              </label>
              <Input
                disabled={isSignUpPending}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 px-4 transition-all focus:bg-white dark:border-gray-700 dark:bg-gray-900/50"
                type="password"
                placeholder="비밀번호 재입력"
              />
            </div>

            <Button
              disabled={isSignUpPending}
              onClick={handleSignUpOnClick}
              className="mt-2 h-12 w-full rounded-xl bg-indigo-600 text-base font-bold transition-all hover:bg-indigo-700 active:scale-[0.99]"
            >
              {isSignUpPending ? "가입 요청 중..." : "회원가입 완료"}
            </Button>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6 text-center dark:border-gray-800">
            <p className="text-sm text-gray-500">
              이미 회원이신가요?{" "}
              <Link
                to="/sign-in"
                className="font-semibold text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
              >
                로그인하기
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-xs leading-relaxed text-gray-400">
          가입 시 서비스{" "}
          <span className="cursor-pointer underline">이용약관</span> 및{" "}
          <span className="cursor-pointer underline">개인정보 처리방침</span>에
          동의하게 됩니다.
        </p>
      </div>
    </div>
  );
}
