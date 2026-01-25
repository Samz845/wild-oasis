import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success(`Cabin ${data.id} successfully edited`);
    },

    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
