import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useEditSettings() {
  const queryClient = useQueryClient();
  const { isPending: isUpdatingSetting, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Setting successfully updated");
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdatingSetting, updateSetting };
}
