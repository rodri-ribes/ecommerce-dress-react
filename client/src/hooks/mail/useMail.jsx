import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addMail, deleteMail, getMail } from "../../services/mail";
import useNotification from "../useNotification";

export default function useMail() {
  const queryClient = useQueryClient();

  const { handleNotification } = useNotification();

  const [shouldLoad, setShouldLoad] = useState(false);

  const addMutationMail = useMutation(addMail, {
    onSuccess: (resp) => {
      handleNotification({
        status: true,
        title: "Éxito",
        text: resp.message,
      });
    },
    onError: (error) => {
      handleNotification({
        status: false,
        title: "Error",
        text: error.response.data,
      });
    },
  });

  const deleteMutationMail = useMutation(deleteMail, {
    onSuccess: (resp, obj) => {
      queryClient.setQueryData(["mails"], (prev) => [
        ...prev.filter((p) => p._id !== obj.id),
      ]);
      handleNotification({
        status: true,
        title: "Éxito",
        text: resp.message,
      });
    },
    onError: (error) => {
      handleNotification({
        status: false,
        title: "Error",
        text: error.response.data,
      });
    },
  });

  const getMailQuery = useQuery({
    queryFn: getMail,
    queryKey: ["mails"],
    refetchOnWindowFocus: false,
    enabled: shouldLoad,
    refetchInterval: false,
  });

  const reloadMail = () => {
    if (!getMailQuery.data) setShouldLoad(true);
  };

  return {
    addMutationMail,
    deleteMutationMail,
    reloadMail,
    mails: getMailQuery.data
      ? getMailQuery.data
      : queryClient.getQueryData(["mails"]),
    getMailQuery,
  };
}
