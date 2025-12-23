import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/mutations/auth/use-sign-up";

import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function SignUppage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const { mutate: signUp, isPending: isSignUpPending } = useSignUp({
    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다.", {
        position: "top-center",
      });
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, {
        position: "top-center",
      });
    },
  });

  const handleSignUpOnClick = () => {
    if (email.trim() === "") {
      toast.error("이메일을 입력해주세요.", {
        position: "top-center",
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("올바른 이메일 형식이 아닙니다.", {
        position: "top-center",
      });
      return;
    }

    if (password.trim() === "") {
      toast.error("비밀번호를 입력해주세요.", {
        position: "top-center",
      });
      return;
    }

    if (passwordConfirm.trim() === "") {
      toast.error("비밀번호 확인을 입력해주세요.", {
        position: "top-center",
      });
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("비밀번호가 일치하지 않습니다.", {
        position: "top-center",
      });
      setPassword("");
      setPasswordConfirm("");
      return;
    }

    signUp({ email, password });
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="text-xl font-bold">회원가입</div>
      <div className="flex flex-col gap-2">
        <Input
          disabled={isSignUpPending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          type="email"
          placeholder="이메일"
        />
        <Input
          disabled={isSignUpPending}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          type="password"
          placeholder="비밀번호"
        />
        <Input
          disabled={isSignUpPending}
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="py-6"
          type="password"
          placeholder="비밀번호확인"
        />
      </div>
      <div>
        <Button
          disabled={isSignUpPending}
          onClick={handleSignUpOnClick}
          className="w-full"
        >
          회원가입
        </Button>
      </div>
      <div>
        <Link className="text-muted-foreground" to={"/sign-in"}>
          이미 계정이 있다면? 로그인
        </Link>
      </div>
    </div>
  );
}
