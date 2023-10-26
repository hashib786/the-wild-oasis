import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings.js";
import { useSearchParams } from "react-router-dom";

export type filterType = {
  field: string;
  value: string;
  method: "lt" | "gt" | "eq" | "lte" | "gte";
};

export type sortType = {
  field: string;
  direction: string;
};

const useBookings = () => {
  const [searchParams] = useSearchParams();
  const paramsStatus = searchParams.get("status");
  const sortStatus = searchParams.get("sortBy") || "startDate-desc";

  // Filter
  const filter: filterType | null =
    !paramsStatus || paramsStatus === "all"
      ? null
      : {
          field: "status",
          value: paramsStatus,
          method: "eq",
        };

  // Sort
  const sortBy: sortType | null =
    sortStatus.split("-").length === 2
      ? {
          field: sortStatus.split("-").at(0) || "startDate",
          direction: sortStatus.split("-").at(1) || "desc",
        }
      : null;

  const { isLoading, data: bookings } = useQuery<BookingI[]>({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getAllBookings({ filter, sortBy }),
  });

  return { isLoading, bookings: bookings || [] };
};

export default useBookings;
