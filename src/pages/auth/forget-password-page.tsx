import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRequestPasswordResetEmail } from "@/hooks/mutations/auth/use-forget-password-page";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react"; // 뒤로가기 아이콘 추가

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");

  const {
    mutate: requestPasswordResetEmail,
    isPending: isRequestPasswordResetEmailPending,
  } = useRequestPasswordResetEmail({
    onSuccess: () => {
      toast.info("인증 메일이 발송되었습니다. 받은 편지함을 확인해주세요.", {
        position: "top-center",
      });
      setEmail("");
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, {
        position: "top-center",
      });
      setEmail("");
    },
  });

  const handleSendEmailClick = () => {
    if (email.trim() === "") {
      return toast.error("이메일을 입력해주세요.");
    }
    requestPasswordResetEmail(email);
  };

  return (
    <div className="flex w-full items-center justify-center px-4">
      <div className="animate-in fade-in slide-in-from-bottom-4 w-full max-w-110 duration-500">
        <div className="my-8 text-center">
          <Link
            to="/sign-in"
            className="group mb-4 inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-indigo-500 dark:text-gray-400"
          >
            <ChevronLeft
              size={16}
              className="mr-1 transition-transform group-hover:-translate-x-1"
            />
            로그인으로 돌아가기
          </Link>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            비밀번호 찾기
          </h1>
          <p className="text-muted-foreground mt-3">
            계정에 등록된 이메일을 입력하시면
            <br />
            비밀번호 재설정 링크를 보내드립니다.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm dark:border-gray-800 dark:bg-[#16181A]">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                이메일 주소
              </label>
              <Input
                disabled={isRequestPasswordResetEmailPending}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 px-4 transition-all focus:bg-white dark:border-gray-700 dark:bg-gray-900/50"
                placeholder="example@abc.com"
                type="email"
              />
            </div>

            <Button
              disabled={isRequestPasswordResetEmailPending}
              onClick={handleSendEmailClick}
              className="h-12 w-full cursor-pointer rounded-xl bg-indigo-600 text-base font-bold transition-all hover:bg-indigo-700 active:scale-[0.99]"
            >
              {isRequestPasswordResetEmailPending
                ? "메일 발송 중..."
                : "인증 메일 요청하기"}
            </Button>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6 text-center dark:border-gray-800">
            <p className="text-xs leading-relaxed text-gray-400">
              메일이 오지 않는다면 스팸 메일함을 확인하거나,
              <br />
              잠시 후 다시 시도해 주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
