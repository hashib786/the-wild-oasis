import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings.js";
import { useSearchParams } from "react-router-dom";

export type filterType = {
  field: string;
  value: string;
  method: "lt" | "gt" | "eq" | "lte" | "gte";
};

const useBookings = () => {
  const [searchParams] = useSearchParams();
  const paramsStatus = searchParams.get("status");

  const filter: filterType | null =
    !paramsStatus || paramsStatus === "all"
      ? null
      : {
          field: "status",
          value: paramsStatus,
          method: "eq",
        };

  const { isLoading, data: bookings } = useQuery<BookingI[]>({
    queryKey: ["bookings", filter],
    queryFn: () => getAllBookings({ filter }),
  });

  return { isLoading, bookings: bookings || [] };
};

export default useBookings;
