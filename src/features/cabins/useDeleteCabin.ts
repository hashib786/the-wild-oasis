import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

const useDeleteCabin = (
  toastRef: React.MutableRefObject<string | undefined>
) => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id: number) => deleteCabinApi(id),
    onSuccess: () => {
      toast.dismiss(toastRef.current);
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin deleted successfully");
    },
    onError: (err: Error) => {
      toast.dismiss(toastRef.current);
      console.log(toastRef.current);

      toast.error(err?.message);
    },
  });

  return { isDeleting, deleteCabin };
};

export default useDeleteCabin;
