import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdatePassword } from "@/hooks/mutations/auth/use-reset-password-page";
import { generateErrorMessage } from "@/lib/error";
import { useSession } from "@/store/session";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const session = useSession();

  if (!session) return <Navigate to={"/"} replace={true} />;

  const { mutate: updatePassword, isPending: isUpdatePasswordPending } =
    useUpdatePassword({
      onSuccess: () => {
        toast.success("비밀번호가 성공적으로 변경되었습니다.", {
          position: "top-center",
        });
        navigate("/main");
      },
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });
        setPassword("");
        setConfirmPassword("");
      },
    });

  const handleUpdatePasswordClick = () => {
    if (!password.trim()) return toast.error("새 비밀번호를 입력해주세요.");
    if (password.length < 6)
      return toast.error("비밀번호는 최소 6자 이상이어야 합니다.");
    if (password !== confirmPassword)
      return toast.error("비밀번호가 일치하지 않습니다.");

    updatePassword(password);
  };

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="animate-in fade-in slide-in-from-bottom-4 w-full max-w-110 duration-500">
        {/* 상단 타이틀 */}
        <div className="my-8 text-center">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            새 비밀번호 설정
          </h1>
          <p className="text-muted-foreground mt-3">
            계정 보안을 위해 안전한 비밀번호를 입력해주세요
          </p>
        </div>

        {/* 카드 레이아웃 */}
        <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm dark:border-gray-800 dark:bg-[#16181A]">
          <div className="space-y-5">
            {/* 새 비밀번호 */}
            <div className="space-y-2">
              <label className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                새 비밀번호
              </label>
              <Input
                disabled={isUpdatePasswordPending}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 px-4 transition-all focus:bg-white dark:border-gray-700 dark:bg-gray-900/50"
                placeholder="••••••••"
              />
            </div>

            {/* 비밀번호 확인 */}
            <div className="space-y-2">
              <label className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                비밀번호 확인
              </label>
              <Input
                disabled={isUpdatePasswordPending}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 px-4 transition-all focus:bg-white dark:border-gray-700 dark:bg-gray-900/50"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <Button
                disabled={isUpdatePasswordPending}
                onClick={handleUpdatePasswordClick}
                className="h-12 w-full rounded-xl bg-indigo-600 text-base font-bold transition-all hover:bg-indigo-700 active:scale-[0.99]"
              >
                {isUpdatePasswordPending ? "변경 중..." : "비밀번호 변경 완료"}
              </Button>
            </div>
          </div>

          {/* 하단 안내 */}
          <div className="mt-8 border-t border-gray-100 pt-6 text-center dark:border-gray-800">
            <p className="text-xs text-gray-400">
              비밀번호 변경 후 자동으로 서비스 이용이 가능합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
