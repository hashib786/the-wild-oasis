import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings.js";
import toast from "react-hot-toast";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const toastRef = useRef<string | undefined>();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckIn } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: number;
      breakfast?: { [key: string]: unknown };
    }) => {
      toastRef.current = toast.loading("Checking in...");
      return updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      });
    },
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked in!`);
      queryClient.invalidateQueries({ type: "active" });
      navigate("/bookings");
    },
    onError: () => {
      toast.success(`There was an error while checking in!`);
    },
    onSettled: () => toast.dismiss(toastRef.current),
  });

  return { checkin, isCheckIn };
};
