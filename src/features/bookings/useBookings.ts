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

  // Pagination
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { isLoading, data } = useQuery<{ data: BookingI[]; count: number }>({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getAllBookings({ filter, sortBy, page }),
  });
  if (!data) return { isLoading, bookings: [], count: 0 };
  return { isLoading, bookings: data.data, count: data.count };
};

export default useBookings;
