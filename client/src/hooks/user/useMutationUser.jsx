import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotification from "../useNotification";
import { signinUser, signupUser, updateUser } from "../../services/user";

export default function useMutationUser() {
  const queryClient = useQueryClient();

  const { handleNotification } = useNotification();


  const signInUserMutation = useMutation(signinUser,
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(["user"], resp.data.user);
      },
      onError: (error) => {
        handleNotification({
          status: false,
          title: "Error",
          text: error.response.data,
        });
      },
    }
  );

  const signUpUserMutation = useMutation(signupUser,
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(["user"], resp.data.user);
      },
      onError: (error) => {
        handleNotification({
          status: false,
          title: "Error",
          text: error.response.data,
        });
      },
    }
  );

  const updateUserMutation = useMutation(updateUser,
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(["user"], resp.data.user);
      },
      onError: (error) => {
        handleNotification({
          status: false,
          title: "Error",
          text: error.response.data,
        });
      },
    }
  );

  return {
    signInUserMutation,
    signUpUserMutation,
    updateUserMutation,
    user: queryClient.getQueryData(["user"]),
  };
}
