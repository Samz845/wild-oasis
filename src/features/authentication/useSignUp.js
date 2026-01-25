import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: signUpApi,

    onSuccess: () => {
      toast.success(
        "Sign up successful, please confirm registration via email"
      );
    },

    onError: (error) => toast.error(error.message),
  });

  return { signup, isSigningUp };
}
