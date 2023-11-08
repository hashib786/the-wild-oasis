import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const toastId = useRef<string | undefined>(undefined);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }: LoginI) => {
      toastId.current = toast.loading("Try to Login...");
      return loginApi({ email, password });
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Login Success fully");
      navigate("/dashboard", { replace: true });
      queryClient.setQueriesData(["user"], data.user);
    },
    onError: () => toast.error("Provided email or password is incorrect"),
    onSettled: () => toastId.current && toast.dismiss(toastId.current),
  });

  return { isLoading, login };
};
