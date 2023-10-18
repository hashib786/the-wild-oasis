import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings.js";

const useSettings = () => {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery<SettingI>({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, isLoading, error };
};

export default useSettings;
