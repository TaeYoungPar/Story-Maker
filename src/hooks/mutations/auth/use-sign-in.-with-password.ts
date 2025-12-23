import { signInWithPassword } from "@/api/auth";
import type { UseMutationCallback } from "@/type";
import { useMutation } from "@tanstack/react-query";

export default function useSignWithPassword(callbacks: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,

    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
