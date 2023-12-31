import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

const useCabins = () => {
  const { isLoading, data: cabins } = useQuery<CabinI[]>({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins: cabins || [] };
};

export default useCabins;
