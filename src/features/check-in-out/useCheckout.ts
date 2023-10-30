import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings.js";
import toast from "react-hot-toast";
import { useRef } from "react";

export const useCheckOut = () => {
  const queryClient = useQueryClient();
  const toastRef = useRef<string | undefined>();

  const { mutate: checkOut, isLoading: isCheckIngOut } = useMutation({
    mutationFn: (bookingId: number) => {
      toastRef.current = toast.loading("CheckOut in...");
      return updateBooking(bookingId, {
        status: "checked-out",
      });
    },
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked Out!`);
      queryClient.invalidateQueries({ type: "active" });
    },
    onError: () => {
      toast.success(`There was an error while CheckOut in!`);
    },
    onSettled: () => toast.dismiss(toastRef.current),
  });

  return { checkOut, isCheckIngOut };
};
