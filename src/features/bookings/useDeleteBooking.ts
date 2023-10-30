import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings.js";
import toast from "react-hot-toast";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const toastRef = useRef<string | undefined>();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId: number) => {
      toastRef.current = toast.loading("Deleting ...");
      return deleteBookingApi(bookingId);
    },
    onSuccess: () => {
      toast.dismiss(toastRef.current);
      toast.success(`Booking successfully Deleted!`);
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => {
      toast.dismiss(toastRef.current);
      toast.success(`There was an error while Deleted!`);
    },
  });

  return { deleteBooking, isDeleting };
};
