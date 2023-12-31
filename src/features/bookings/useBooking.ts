import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings.js";
import { useParams } from "react-router-dom";

export const useBooking = () => {
  const { bookingId } = useParams();

  const { isLoading, data: booking } = useQuery<BookingDataI>({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId || ""),
    retry: false,
  });

  return { isLoading, booking: booking };
};

export default useBooking;
