import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditBooking } from "../../services/apiBookings";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createBooking } = useMutation({
    mutationFn: createEditBooking,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("Booking successfully created");
    },

    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createBooking };
}
