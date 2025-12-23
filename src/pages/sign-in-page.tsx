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

        toast.error(message, {
          position: "top-center",
        });
        setPassword("");
      },
    });
  const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } =
    useSignWithOAuth({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });
      },
    });

  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({
      email,
      password,
    });
  };

  const handleSignWithGitHubClick = () => {
    signInWithOAuth("google");
  };

  const isPending = isSignInWithOAuthPending || isSignInWithPasswordPending;

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        <Input
          disabled={isPending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          type="email"
          placeholder="example@abc.com"
        />
        <Input
          disabled={isPending}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          type="password"
          placeholder="password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          disabled={isPending}
          onClick={handleSignInWithPasswordClick}
          className="w-full"
        >
          로그인
        </Button>
        <Button
          disabled={isPending}
          onClick={handleSignWithGitHubClick}
          className="w-full"
          variant={"outline"}
        >
          <img src={googleLogo} className="h-4 w-4" />
          Google 계정으로 로그인
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Link className="text-muted-foreground" to={"/sign-up"}>
          계정이 없으시다면? 회원가입
        </Link>
        <Link
          className="text-muted-foreground hover:underline"
          to={"/forget-password"}
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </div>
  );
}
