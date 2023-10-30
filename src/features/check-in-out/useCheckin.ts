import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings.js";
import toast from "react-hot-toast";
import { useRef } from "react";

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const toastRef = useRef<string | undefined>();

  const { mutate: checkin, isLoading: isCheckIn } = useMutation({
    mutationFn: (bookingId: number) => {
      toastRef.current = toast.loading("Checking in...");
      return updateBooking(bookingId, { status: "checked-in", isPaid: true });
    },
    onSuccess: (data) => {
      toast.dismiss(toastRef.current);
      toast.success(`Booking ${data.id} successfully checked in!`);
      queryClient.invalidateQueries({ type: "active" });
    },
    onError: () => {
      toast.dismiss(toastRef.current);
      toast.success(`There was an error while checking in!`);
    },
  });

  return { checkin, isCheckIn };
};
