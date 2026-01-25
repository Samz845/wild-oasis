import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isLoggingOut, mutate: logout } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login");
    },

    onError: (error) => toast.error(error.message),
  });

  return { logout, isLoggingOut };
}
