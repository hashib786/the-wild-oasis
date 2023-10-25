import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings.js";

const useBookings = () => {
  const { isLoading, data: bookings } = useQuery<BookingI[]>({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
  });

  return { isLoading, bookings: bookings || [] };
};

export default useBookings;
