import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

const useCreateEditCabin = (
  toastRef: React.MutableRefObject<string | undefined>,
  isEditSession: boolean = false
) => {
  const queryClient = useQueryClient();
  // Create/Edit cabin
  const { isLoading: isWorking, mutate: createEditMutateCabin } = useMutation({
    mutationFn: ({ cabin, id }: { cabin: FormDataI; id?: number }) => {
      return createEditCabin(cabin, id);
    },
    onSuccess: () => {
      toast.dismiss(toastRef?.current);
      toast.success(
        `${isEditSession ? "" : "New "}Cabin ${
          isEditSession ? "Edited" : "Created"
        } successfully`
      );
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (error: Error) => {
      toast.dismiss(toastRef?.current);
      toast.error(error.message);
    },
  });

  return { isWorking, createEditMutateCabin };
};

export default useCreateEditCabin;
