import { signInWithOAuth } from "@/api/auth";
import type { UseMutationCallback } from "@/type";
import { useMutation } from "@tanstack/react-query";

export default function useSignWithOAuth(callbacks: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithOAuth,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
