import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings.js";
import toast from "react-hot-toast";

const useUpdateSetting = (
  toastRef: React.MutableRefObject<string | undefined>
) => {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.dismiss(toastRef?.current);
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries(["settings"]);
    },
    onError: (error: Error) => {
      toast.dismiss(toastRef?.current);
      toast.error(error.message);
    },
  });

  return { isUpdating, updateSetting };
};

export default useUpdateSetting;
